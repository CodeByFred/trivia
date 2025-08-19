import React, { useState } from "react";
import Button from "../components/Button";

interface TriviaFormProps {
  answers: string[];
  correctAnswer: string | null;
}

const TriviaForm = ({ answers, correctAnswer }: TriviaFormProps) => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validate data
    console.log(
      `Submitted Answer: ${!chosenAnswer ? "Not found" : chosenAnswer}`
    );
    //check result
    if (chosenAnswer === correctAnswer) {
      //fetch and display next question
    } else {
      //nav to game over screen
    }
    setIsSubmitted(true);
  };

  return (
    <form
      action="submit"
      onSubmit={handleSubmit}
      className="flex flex-col items-center"
    >
      <fieldset
        aria-valuemax={answers.length}
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
                checked={chosenAnswer === answer}
                onChange={(e) => setChosenAnswer(e.target.value)}
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
      <Button type="submit">Submit</Button>
      {isSubmitted && (
        <span className="mt-4">
          Result: {chosenAnswer === correctAnswer ? "Correct!" : "Incorrect!"}
        </span>
      )}
    </form>
  );
};

export default TriviaForm;
