import type { Question } from "../types/types";
import TriviaForm from "../containers/TriviaForm";
import { shuffle } from "../utils/utils";
import { useEffect, useState } from "react";

interface TriviaQuestionProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onNext: () => void;
}

const TriviaQuestion = ({ question, index, totalQuestions }: TriviaQuestionProps) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!question) return;

    const orderedAnswers = [
      question?.correctAnswer,
      question?.incorrectAnswers[0],
      question?.incorrectAnswers[1],
      question?.incorrectAnswers[2],
    ].filter((a): a is string => typeof a === "string");

    setShuffledAnswers(shuffle(orderedAnswers));
  }, [question]);

  return (
    <>
      <h3>{`Question ${index + 1 || ""}/${totalQuestions || ""}`}</h3>
      <p>{question?.question}</p>
      {question && (
        <TriviaForm answers={shuffledAnswers} correctAnswer={question.correctAnswer} />
      )}
    </>
  );
};

export default TriviaQuestion;
