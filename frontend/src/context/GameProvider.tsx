import { useEffect, useState } from "react";
import {
  type Answer,
  type Difficulty,
  type GameState,
  type Question,
  type RetryQuestion,
  type RetryQuestionResponse,
  type TriviaCategoryID,
} from "../types/types";
import { GameContext } from "./GameContext";
import type { PropsWithChildren } from "react";
import { getNewToken } from "../services/sessionToken";
import { triviaQuery } from "../services/triviaHttp";
import {
  postGameData,
  requestRetryQuestions,
  updateRetryGameAnswer,
} from "../services/gameApi";

const GameProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("any");
  const [categoryID, setCategoryID] = useState<TriviaCategoryID>(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedAnswers, setSavedAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  // const [gameHistory] = useState<GameHistory>([]);
  const [incorrectQuestions, setIncorrectQuestions] = useState<RetryQuestion[]>(
    []
  );
  const [quantity, setQuantity] = useState<number>(0);

  const initToken = async (): Promise<string | null> => {
    try {
      // token
      const token = await getNewToken();
      setToken(token);
      console.log(`Token key: ${token}`);

      // expiry
      const expiry = Date.now() + 1000 * 60 * 60 * 6;
      setTokenExpiry(expiry);

      localStorage.setItem("triviaToken", token);
      localStorage.setItem("triviaTokenExpiry", expiry.toString());

      // Log expiry date/time
      // NOTE: maybe we can store these in context too to display? ie. send to <UserSession /> ?
      const expiryDate = new Date(expiry).toLocaleDateString();
      const expiryTime = new Date(expiry).toLocaleTimeString();
      console.log(`Expiry: ${expiryDate} at ${expiryTime} (${expiry})`);

      return token;
    } catch (e) {
      console.log(`Failed to retrieve token: ${e}`);
      setError("Could not get a new session token, try refreshing the page");
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("triviaToken");
    const storedExpiry = localStorage.getItem("triviaTokenExpiry");

    if (storedToken && storedExpiry) {
      if (Date.now() < Number(storedExpiry)) {
        setToken(storedToken);
        setTokenExpiry(Number(storedExpiry));
      } else {
        initToken();
      }
    } else {
      initToken();
    }
  }, []);

  const updateDifficulty = (d: Difficulty) => {
    setDifficulty(d);
  };

  const updateCategoryID = (id: number) => {
    setCategoryID(id);
  };

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
  };

  const getQuestions = async (difficulty: Difficulty, id: TriviaCategoryID) => {
    let activeToken = token;

    if (!activeToken || (tokenExpiry && Date.now() > tokenExpiry)) {
      activeToken = await initToken();
    }

    try {
      setLoading(true);
      setError(null);
      const data = await triviaQuery(2, difficulty, id, activeToken!);
      setQuestions(data);
    } catch (error) {
      console.log(error, categoryID, difficulty);
    } finally {
      setLoading(false);
    }
  };

  const getIncorrectQuestions = async (
    difficulty: Difficulty,
    quantity: number
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await requestRetryQuestions(difficulty, quantity);
      setIncorrectQuestions(data);
    } catch (error) {
      console.log(error, difficulty, quantity);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
      return;
    }

    if (gameState === "idle") {
      console.log(`Game idle. Ready to start a new game.`);
      return;
    }

    if (gameState === "playing") {
      console.log(`Game in progress. Question number: ${currentIndex + 1}`);
      return;
    }

    if (gameState === "finished") {
      const isRetryMode = incorrectQuestions.length > 0;

      if (isRetryMode) {
        console.log(`Retry session complete.`);
      } else {
        console.log(`Game finished. Final score: ${score}/${questions.length}`);

        console.log(
          `Game questions:\n${questions
            .map((q, i) => `Q${i + 1}: ${q.question}`)
            .join("\n")}`
        );

        console.log(
          `Your answers:\n${savedAnswers
            .map(
              (a) =>
                `Q${a.questionIndex + 1}: ${a.submittedAnswer} (${
                  a.wasCorrect ? "correct" : "incorrect"
                })`
            )
            .join("\n")}`
        );

        // only call in normal mode
        saveGame();
      }
    }
  }, [gameState, savedAnswers, loading]);

  const resetGame = () => {
    console.log(`Resetting game...`);
    setSavedAnswers([]);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setGameState("idle");
  };

  const startGame = () => {
    if (gameState !== "idle") {
      resetGame();
    }

    console.log(`Loading new questions...`);
    getQuestions(difficulty, categoryID);

    console.log(`Starting new game...`);
    setGameState("playing");
    setScore(0);
  };

  const retryGame = () => {
    if (gameState !== "idle") {
      resetGame();
    }

    console.log(`Loading new questions...`);
    getIncorrectQuestions(difficulty, quantity);

    console.log(`Starting new game...`);
    setGameState("playing");
    setScore(0);
  };

  const submitAnswer = (submitted: string | null) => {
    // NORMAL MODE
    if (incorrectQuestions.length === 0) {
      const wasCorrect = submitted === questions[currentIndex].correctAnswer;

      const answer: Answer = {
        questionIndex: currentIndex,
        submittedAnswer: submitted,
        wasCorrect: wasCorrect,
      };

      setSavedAnswers((prev) => [...prev, answer]);

      if (wasCorrect) incrementScore();

      if (currentIndex + 1 >= questions.length) {
        endGame();
      } else {
        loadNextQuestion();
      }

      // RETRY MODE
    } else if (incorrectQuestions.length > 0) {
      const currentRetryQuestion = incorrectQuestions[currentIndex];

      const wasCorrect =
        submitted === currentRetryQuestion.question.correctAnswer;

      // update DB archive status
      const archiveOption: RetryQuestionResponse = {
        id: currentRetryQuestion.id,
        archived: wasCorrect,
      };

      updateRetryGameAnswer(archiveOption);

      // Move on to next or finish
      if (currentIndex + 1 >= incorrectQuestions.length) {
        endGame();
      } else {
        loadNextQuestion();
      }
    }
  };

  const incrementScore = () => {
    // add points to the scoreboard
    setScore((prev) => prev + 1);
  };

  const loadNextQuestion = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setGameState("playing");
  };

  const endGame = () => {
    setGameState("finished");
  };

  const saveGame = async () => {
    console.log("Saving game to DB... ");

    const finalGameDto = {
      //Game Entity
      savedScore: score,

      //GameAnswer Entity
      savedAnswers: savedAnswers,

      //Questions Entity
      savedQuestions: questions,
    };

    console.log("finalGameDto: ");
    console.log(finalGameDto);

    postGameData(finalGameDto);
  };

  return (
    <GameContext.Provider
      value={{
        loading,
        error,
        token,
        tokenExpiry,
        gameState,
        difficulty,
        categoryID,
        questions,
        currentIndex,
        score,
        quantity,
        updateDifficulty,
        updateCategoryID,
        startGame,
        retryGame,
        submitAnswer,
        loadNextQuestion,
        endGame,
        saveGame,
        savedAnswers,
        // gameHistory,
        updateQuantity,
        incorrectQuestions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
