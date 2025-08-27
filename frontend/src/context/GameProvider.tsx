import { useState } from "react";
import type {
  AnsweredQuestion,
  Difficulty,
  GameState,
  Question,
  TriviaCategoryID,
} from "../types/types";
import { GameContext } from "./GameContext";
import type { PropsWithChildren } from "react";
import { getNewToken } from "../services/sessionToken";
import { triviaQuery } from "../services/triviaHttp";

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
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
  const [score, setScore] = useState(0);

  const initToken = async (): Promise<string> => {
    const token = await getNewToken();
    const expiry = Date.now() + 1000 * 60 * 60;
    setToken(token);
    setTokenExpiry(expiry);
    console.log(token, expiry);
    return token;
  };

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
      const data = await triviaQuery(10, difficulty, id, token!);
      setQuestions(data);
    } catch (error) {
      console.log(error, categoryID, difficulty);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    getQuestions(difficulty, categoryID);
    console.log(token);
    setCurrentIndex(0);
    setGameState("playing");
    setScore(0);
    setAnsweredQuestions([]);
  };

  const saveAnswer = () => {};

  const loadNextQuestion = () => {};

  const incrementScore = () => {};

  const resetGame = () => {};

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
        answeredQuestions,
        score,
        updateDifficulty,
        updateCategoryID,
        startGame,
        saveAnswer,
        loadNextQuestion,
        incrementScore,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameProvider;
