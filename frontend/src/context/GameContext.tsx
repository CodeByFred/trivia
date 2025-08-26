import { createContext } from "react";
import type {
  Answer,
  Difficulty,
  GameResult,
  GameState,
  Question,
  TriviaCategoryID,
} from "../types/types";

export type GameContextType = {
  loading: boolean;
  error: string | null;
  token: string | null;
  tokenExpiry: number | null;
  gameState: GameState;
  difficulty: Difficulty;
  categoryID: TriviaCategoryID;
  questions: Question[];
  currentIndex: number;
  savedAnswers: Answer[];
  gameHistory: GameResult[];
  score: number;

  updateDifficulty: (difficulty: Difficulty) => void;
  updateCategoryID: (id: number) => void;
  startGame: () => void;
  endGame: () => void;
  scoreAnswer: (submitted: string | null) => Answer;
  saveAnswer: (answer: Answer | null) => void;
  loadNextQuestion: () => void;
  resetGame: () => void;
  saveGame: () => void;
};

export const GameContext = createContext<GameContextType | null>(null);
