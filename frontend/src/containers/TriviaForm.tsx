import { useState } from "react";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import GameAnswers from "../components/GameAnswers";
import type { Question, RetryQuestion } from "../types/types";
import { typography } from "../styles/typography";
import PopUp from "../components/PopUp";

const TriviaForm = ({
  answers,
  activeQuestion,
}: {
  answers: string[];
  activeQuestion: Question | RetryQuestion;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { submitAnswer } = useGameContext();

  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-8 w-full h-100 max-w-4xl px-8"
        onSubmit={(e) => {
          e.preventDefault();
          submitAnswer(selected, activeQuestion);
          setSelected(null);
          setIsCorrect(selected === correctAnswer);
          setIsLoadingNext(true);
          console.log(`${selected}`);
          console.log(`${correctAnswer}`);
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
