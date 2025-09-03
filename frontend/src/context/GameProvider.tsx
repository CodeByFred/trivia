import { useEffect, useState } from "react";
import type {
  Answer,
  Difficulty,
  GameState,
  GameHistory,
  Question,
  TriviaCategoryID,
  GameResultDto,
  GameQuestionsDto,
} from "../types/types";
import { GameContext } from "./GameContext";
import type { PropsWithChildren } from "react";
import { getNewToken } from "../services/sessionToken";
import { triviaQuery } from "../services/triviaHttp";
import { postGameData } from "../services/gameApi";

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
  const [gameHistory] = useState<GameHistory>([]);

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

  const getQuestions = async (difficulty: Difficulty, id: TriviaCategoryID) => {
    let activeToken = token;

    if (!activeToken || (tokenExpiry && Date.now() > tokenExpiry)) {
      activeToken = await initToken();
    }

    try {
      setLoading(true);
      setError(null);
      const data = await triviaQuery(10, difficulty, id, activeToken!);
      setQuestions(data);
    } catch (error) {
      console.log(error, categoryID, difficulty);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    getQuestions(difficulty, categoryID);
    setCurrentIndex(0);
    setGameState("playing");
    setScore(0);
    console.log(`New Game Started!`);
  };

  const scoreAnswer = (submitted: string | null) => {
    //check empty submission
    // if (!submitted) {
    //   alert("Please select an answer before submitting.");
    //   throw new Error("No answer submitted");
    // }
    //build answer format
    const answer: Answer = {
      questionIndex: currentIndex,
      submitted: submitted,
      wasCorrect: false,
    };
    // check if answer was correct
    if (answer.submitted === questions[currentIndex].correctAnswer) {
      console.info(`"${answer.submitted}" is correct`);
      setScore((prev) => prev + 1);
      answer.wasCorrect = true;
    } else {
      console.info(
        `"${answer.submitted}" is incorrect. The correct answer was "${questions[currentIndex].correctAnswer}".`
      );
      answer.wasCorrect = false;
    }
    console.log(`Current score: ${score}`);
    return answer; // returns to TriviaForm
  };

  const saveAnswer = (answer: Answer | null) => {
    if (!answer) {
      throw new Error(`Submitted answer could not be found.`);
    }
    setSavedAnswers((prev) => [...prev, answer]);
  };

  const loadNextQuestion = () => {
    setCurrentIndex((prev) => prev + 1);
    // end game if all questions have been answered
    if (!loading && currentIndex + 1 >= questions.length) {
      console.log("End of quiz! There are no more questions :)");
      endGame();
      return;
    }
    console.log(
      `Loading next question: ${currentIndex + 1} of ${questions.length}`
    );
    if (!questions[currentIndex]) {
      throw new Error(`Question at index ${currentIndex} not found`);
    }
  };

  const endGame = () => {
    console.log("");
    console.log(`Game Over!`);
    setGameState("finished");

    // testing logs -> TODO - turn into api logs
    console.log(
      `Your answers:\n${savedAnswers
        .map(
          (a) =>
            `Q${a.questionIndex + 1}: ${a.submitted} (${
              a.wasCorrect ? "correct" : "incorrect"
            })`
        )
        .join("\n")}`
    );
    console.log(`Final score: ${score}/${questions.length}`);
    saveGame();
  };

  const saveGame = () => {
    console.log("Saving game questions to DB... ");
    const gameQuestionsDto: GameQuestionsDto = {
      questions: questions.map((q) => ({
        type: q.type,
        question: q.question,
        difficulty: q.difficulty,
        category: q.category,
        correctAnswer: q.correctAnswer,
        incorrectAnswers: q.incorrectAnswers,
      })),
    };
    postGameData(gameQuestionsDto);

    console.log("Saving game results to DB... ");
    const gameResultDto: GameResultDto = {
      score,
      answers: savedAnswers,
    };
    postGameData(gameResultDto);

    console.log(
      "Game saved to DB! You can review all past games in the Review page."
    );
  };

  const resetGame = () => {
    console.log("Resetting game... ");
    setScore(0);
    setCurrentIndex(0);
    setSavedAnswers([]);
    console.log(`Score Reset! Resetting game state to 'playing'`);
    setGameState("playing");
    console.log(`Game state Reset!`);
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
        updateDifficulty,
        updateCategoryID,
        startGame,
        scoreAnswer,
        saveAnswer,
        loadNextQuestion,
        endGame,
        resetGame,
        saveGame,
        savedAnswers,
        gameHistory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
