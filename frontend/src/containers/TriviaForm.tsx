import { useState } from "react";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import GameAnswers from "../components/GameAnswers";
import type { Question, RetryQuestion } from "../types/types";

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
    <form
      className="flex flex-col gap-8 w-full max-w-4xl px-8"
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(selected, activeQuestion);
        setSelected(null);
      }}
    >
      {answers ? (
        <GameAnswers
          answers={answers}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        <p>Something went wrong: Couldn't find answers</p>
      )}
      <Button
        disabled={!selected}
        className="btn-primary btn-xl col-span-2 mx-auto"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default TriviaForm;
