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
      className="grid grid-cols-2 gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        submitAnswer(selected);
      }}
    >
      {answers ? (
        answers.map((answer: string, i: number) => (
          <label key={i} className="cursor-pointer">
            <input
              id={`choice${i}`}
              type="radio"
              name="trivia-choice"
              value={answer}
              checked={selected === answer}
              onChange={(e) => setSelected(e.target.value)}
              className="peer hidden"
            />
            <div className="w-100 h-60 flex items-center justify-center rounded-lg bg-gray-200 peer-checked:bg-primary peer-checked:text-white transition">
              <p className="text-2xl">{answer}</p>
            </div>
          </label>
        ))
      ) : (
        <p>Something went wrong: Couldn't find answers</p>
      )}
      <Button
        className="btn btn-primary btn-xl btn-wide col-span-2 mx-auto"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default TriviaForm;
