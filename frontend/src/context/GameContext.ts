import { createContext } from "react";
import type { Question, AnsweredQuestion } from "../types/types";

export type GameContextType = {
  gameState: "playing" | "finished";
  setGameState: React.Dispatch<React.SetStateAction<"playing" | "finished">>;

  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;

  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;

  answeredQuestions: AnsweredQuestion[];
  setAnsweredQuestions: React.Dispatch<
    React.SetStateAction<AnsweredQuestion[]>
  >;

  currentQuestion: Question | null;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question | null>>;

  questionCount: number;
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>;

  shuffledAnswers: string[];

  loadNextQuestion: () => void;
  incrementScore: (addedScore: number) => void;
  saveAnswer: (submitted: string | null) => void;
};

export const GameContext = createContext<GameContextType | null>(null);
