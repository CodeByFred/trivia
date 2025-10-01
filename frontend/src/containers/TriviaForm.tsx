import { useEffect, useState, useRef } from "react";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import GameAnswers from "../components/GameAnswers";
import type { Question, RetryQuestion } from "../types/types";
import { typography } from "../styles/typography";
import PopUp from "../components/PopUp";

const TriviaForm = ({
  correctAnswer,
  answers,
  activeQuestion,
}: {
  correctAnswer: string;
  answers: string[];
  activeQuestion: Question | RetryQuestion;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { submitAnswer } = useGameContext();

  // Cleanup timeout on unmount

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selected === correctAnswer);
    setIsCorrect(selected === correctAnswer);
    setIsVisible(true);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      submitAnswer(selected, activeQuestion);
      setSelected(null);
    }, 500); // 1 second delay to show popup icon
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-4 w-full h-100 max-w-4xl p-4"
        onSubmit={handleSubmit}
      >
        {answers ? (
          <GameAnswers
            answers={answers}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <p className={typography.body}>
            Something went wrong: Couldn't find answers
          </p>
        )}
        <Button disabled={!selected} className="btn btn-primary " type="submit">
          Submit
        </Button>
      </form>

      {isVisible && <PopUp isCorrect={isCorrect} />}
    </>
  );
};

export default TriviaForm;
