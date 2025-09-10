import React, { useState } from "react";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";

interface TriviaFormProps {
  answers: string[] | null;
  correctAnswer: string | null;
}

const TriviaForm = ({ answers, correctAnswer }: TriviaFormProps) => {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const { saveAnswer, scoreAnswer, loadNextQuestion } = useGameContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // todo : check user selected correct answer
      const result = scoreAnswer(submitted);

      //todo : save answer in logs
      if (!result) throw new Error("No result from scoring answer");
      saveAnswer(result);

      // reset form for next question
      setSubmitted(null);
      setSelected(null);

      //todo: load next question
      loadNextQuestion();
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-4"
      onSubmit={handleSubmit}
      action="submit"
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
        onClick={() => setSubmitted(selected)}
      >
        Submit
      </Button>
      {submitted && (
        <span className="mt-4">
          Result: {submitted === correctAnswer ? "Correct!" : "Incorrect!"}
        </span>
      )}{" "}
    </form>
  );
};

export default TriviaForm;
