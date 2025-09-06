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
      const data = await triviaQuery(2, difficulty, id, activeToken!);
      setQuestions(data);
    } catch (error) {
      console.log(error, categoryID, difficulty);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameState === "finished") {
      console.info(`Final score: ${score}/${questions.length}`);
      console.info(
        `Game questions:\n${questions
          .map((q, i) => `Q${i + 1}: ${q.question}`)
          .join("\n")}`
      );
      console.info(
        `Your answers:\n${savedAnswers
          .map(
            (a) =>
              `Q${a.questionIndex + 1}: ${a.submitted} (${
                a.wasCorrect ? "correct" : "incorrect"
              })`
          )
          .join("\n")}`
      );
      resetGame();
    }
  }, [gameState, savedAnswers, questions, score]);

  const startGame = () => {
    getQuestions(difficulty, categoryID);
    setCurrentIndex(0);
    setGameState("playing");
    setScore(0);
  };

  const resetGame = () => {
    console.log("Resetting game state... ");
    setGameState("idle");
    setScore(0);
    setCurrentIndex(0);
    setSavedAnswers([]);
  };

  const submitAnswer = (submitted: string | null) => {
    const wasCorrect = submitted === questions[currentIndex].correctAnswer;

    const answer: Answer = {
      questionIndex: currentIndex,
      submitted: submitted,
      wasCorrect: wasCorrect,
    };

    setSavedAnswers((prev) => [...prev, answer]);
    // scoreAnswer(answer); // check if legit answer was correct

    if (currentIndex + 1 >= questions.length) {
      endGame(); // all questions done
    } else {
      loadNextQuestion(); // safe to move on
    }
  };

  // const scoreAnswer = (answer: Answer) => {
  //   if (answer.submitted === questions[currentIndex].correctAnswer) {
  //     console.info(`"${answer.submitted}" is correct`);
  //     setScore((prev) => prev + 1);
  //     answer.wasCorrect = true;
  //   } else {
  //     console.info(`"${answer.submitted}" is incorrect.`);
  //   }
  // };

  const loadNextQuestion = () => {
    const nextIndex = currentIndex + 1;

    // if (nextIndex >= questions.length) {
    //   console.log("End of quiz! There are no more questions :)");
    //   endGame();
    // } else {
    //   console.log(`Loading next question: ${nextIndex + 1} of ${questions.length}`);
    // }

    setCurrentIndex(nextIndex);
  };

  const endGame = () => {
    setGameState("finished");
    // // testing logs
    // console.info(`Final score: ${score}/${questions.length}`);
    // console.info(
    //   `Game questions:\n${questions.map((q, i) => `Q${i + 1}: ${q.question}`).join("\n")}`
    // );
    // console.info(
    //   `Your answers:\n${savedAnswers
    //     .map(
    //       (a) =>
    //         `Q${a.questionIndex + 1}: ${a.submitted} (${
    //           a.wasCorrect ? "correct" : "incorrect"
    //         })`
    //     )
    //     .join("\n")}`
    // );
    // // saveGame();
    // resetGame();
  };

  const saveGame = () => {};

  // const saveGame = async () => {
  //   console.log("Saving game to DB... ");
  //   const qSaved = await saveGameQuestions();
  //   if (!qSaved) {
  //     console.error("Error: Game questions were not saved to DB");
  //     return;
  //   }
  //   const rSaved = await saveGameResult();
  //   if (!rSaved) {
  //     console.error("Error: Game results were not saved to DB");
  //     return;
  //   }
  //   console.log("Game saved to DB! View all past games in the Review page.");
  // };

  // const saveGameQuestions = async () => {
  //   const gameQuestionsDto: GameQuestionsDto = {
  //     questions: questions.map((q) => ({
  //       type: q.type,
  //       question: q.question,
  //       difficulty: q.difficulty,
  //       category: q.category,
  //       correctAnswer: q.correctAnswer,
  //       incorrectAnswers: q.incorrectAnswers,
  //     })),
  //   };
  //   console.log("Saving game questions: " + JSON.stringify(gameQuestionsDto));
  //   const result = await postGameData(gameQuestionsDto);
  //   return result;
  // };

  // const saveGameResult = async () => {
  //   const gameResultDto: GameResultDto = {
  //     score,
  //     answers: savedAnswers,
  //   };
  //   console.log("Saving game results: " + JSON.stringify(gameResultDto));
  //   const result = await postGameData(gameResultDto);
  //   return result;
  // };

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
        submitAnswer,
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
