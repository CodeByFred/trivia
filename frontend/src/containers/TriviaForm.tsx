import { useState } from "react";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import GameAnswers from "../components/GameAnswers";

const TriviaForm = ({ answers }: { answers: string[] }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { submitAnswer } = useGameContext();

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(selected);
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
      <Button className="btn-xl col-span-2 mx-auto" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TriviaForm;
