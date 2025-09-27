import { createContext } from "react";
import type {
  Answer,
  Difficulty,
  // GameHistory,
  GameState,
  Question,
  RetryQuestion,
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
  // gameHistory: GameHistory;
  quantity: number;
  score: number;
  incorrectQuestions: RetryQuestion[];

  updateDifficulty: (difficulty: Difficulty) => void;
  updateCategoryID: (id: number) => void;
  updateQuantity: (quantity: number) => void;
  startGame: () => void;
  retryGame: () => void;
  endGame: () => void;
  submitAnswer: (submitted: string | null) => void;
  loadNextQuestion: () => void;
  resetGame: () => void;
  saveGame: () => void;
};

export const GameContext = createContext<GameContextType | null>(null);
