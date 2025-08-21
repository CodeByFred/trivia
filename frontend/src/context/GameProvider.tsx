import { useEffect, useState, type PropsWithChildren } from "react";
import type { AnsweredQuestion, Question } from "../types/types";
import { shuffle } from "../utils/utils";
import { GameContext } from "./GameContext";

const GameProvider = ({ children }: PropsWithChildren<object>) => {
  // Game state
  const [gameState, setGameState] = useState<"playing" | "finished">("playing");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<
    AnsweredQuestion[]
  >([]);
  // Answers
  const correctAnswer = currentQuestion?.correctAnswer || "";
  const allAnswers: string[] = [
    correctAnswer,
    ...(currentQuestion?.incorrectAnswers || []),
  ];
  const shuffledAnswers = shuffle(allAnswers);

  useEffect(() => {
    setCurrentQuestion(questions[questionCount - 1] || null);
  }, [questionCount, questions]);

  const loadNextQuestion = () => setQuestionCount((prev) => prev + 1);
  const incrementScore = (addedScore: number) =>
    setScore((prev) => prev + addedScore);
  const saveAnswer = (submitted: string | null) => {
    if (!currentQuestion) return;
    setAnsweredQuestions((prev) => [
      ...prev,
      {
        question: currentQuestion,
        userAnswer: submitted,
        wasCorrect: submitted === correctAnswer,
      },
    ]);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        score,
        setGameState,
        setScore,
        questions,
        setQuestions,
        answeredQuestions,
        setAnsweredQuestions,
        currentQuestion,
        setCurrentQuestion,
        shuffledAnswers,
        loadNextQuestion,
        incrementScore,
        saveAnswer,
        questionCount,
        setQuestionCount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
