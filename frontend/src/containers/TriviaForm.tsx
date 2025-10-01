import { useEffect, useState } from "react";
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
  const [isLoadingNext, setIsLoadingNext] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const { submitAnswer } = useGameContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingNext(false);
    }, 1500); // 1.5 second delay
    return () => clearTimeout(timeout);
  }, [isLoadingNext]);

  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-4 w-full h-100 max-w-4xl p-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitAnswer(selected, activeQuestion);
          setSelected(null);
          setIsCorrect(selected === correctAnswer);
          setIsLoadingNext(true);
          console.log(selected === correctAnswer);
        }}
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

      {isLoadingNext && <PopUp isCorrect={isCorrect} />}
    </>
  );
};

export default TriviaForm;
