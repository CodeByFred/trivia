import { createContext } from "react";
import type {
  AnsweredQuestion,
  Difficulty,
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
  answeredQuestions: AnsweredQuestion[];
  score: number;

  updateDifficulty: (difficulty: Difficulty) => void;
  updateCategoryID: (id: number) => void;
  startGame: () => void;
  saveAnswer: (submitted: string | null) => void;
  loadNextQuestion: () => void;
  incrementScore: (points: number) => void;
  resetGame: () => void;
};

export const GameContext = createContext<GameContextType | null>(null);
