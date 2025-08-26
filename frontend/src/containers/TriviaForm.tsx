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
      action="submit"
      onSubmit={handleSubmit}
      className="flex flex-col items-center"
    >
      <fieldset
        aria-valuemax={answers?.length}
        className="grid grid-cols-2 gap-4 my-4 border border-gray-300 p-4 rounded bg-gray-100"
      >
        <legend>Please select your answer:</legend>
        {answers ? (
          answers.map((answer: string, i: number) => (
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
          ))
        ) : (
          <p>Something went wrong: Couldn't find answers</p>
        )}
      </fieldset>
      <Button type="submit" onClick={() => setSubmitted(selected)}>
        Submit
      </Button>
      {submitted && (
        <span className="mt-4">
          Result: {submitted === correctAnswer ? "Correct!" : "Incorrect!"}
        </span>
      )}
    </form>
  );
};

export default TriviaForm;
