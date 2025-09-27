import type { Question } from "../types/types";
import TriviaForm from "../containers/TriviaForm";
import { shuffle } from "../utils/utils";
import { useEffect, useState } from "react";
import { useGameContext } from "../context/useGameContext";

interface TriviaQuestionProps {
  question: Question;
  index: number;
}

const TriviaQuestion = ({ question, index }: TriviaQuestionProps) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const { questions } = useGameContext();

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
      <h3 className="text-xl">{`Question ${index + 1 || ""}/${
        questions.length || ""
      }`}</h3>
      <p className="text-4xl">{question?.question}</p>
      {question && <TriviaForm answers={shuffledAnswers} />}
    </>
  );
};

export default TriviaQuestion;
