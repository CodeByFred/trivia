import { useState } from "react";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";

type FormProps = {
  answers: string[];
};

const TriviaForm = ({ answers }: FormProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const { submitAnswer } = useGameContext();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(selected);
      }}
      className="flex flex-col items-center"
    >
      <fieldset className="grid grid-cols-2 gap-4 my-4 border border-gray-300 p-4 rounded bg-gray-100">
        <legend>Please select your answer:</legend>
        {answers.map((answer: string, i: number) => (
          <span key={i} className="flex items-center">
            <input
              type="radio"
              id={`choice${i}`}
              name="trivia-choice"
              value={answer}
              checked={selected === answer}
              onChange={(e) => setSelected(e.target.value)}
            />
            <label htmlFor={`choice${i}`} className="ml-2">
              {answer}
            </label>
          </span>
        ))}
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default TriviaForm;
