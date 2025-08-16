import { useState } from "react";
import type { Question } from "../../types/types";

interface TriviaQuestionProps {
  question: Question;
  count?: number;
}

const TriviaQuestion = ({ question, count }: TriviaQuestionProps) => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  console.log(`Chosen Answer: ${chosenAnswer}`);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("answer submitted");
    //set chosen answer here
    //setChosenAnswer
    return;
  };

  return (
    <div>
      <h2>{`Question ${count}`}</h2>
      <p>{question.question}</p>
      <ul>
        <li>{question.correctAnswer}</li>
        <li>{question.incorrectAnswers[0]}</li>
        <li>{question.incorrectAnswers[1]}</li>
        <li>{question.incorrectAnswers[2]}</li>
      </ul>
      <form action="submit" onSubmit={handleSubmit}>
        <select name="multipleChoice" id="multipleChoice">
          <option value="correct">{question.correctAnswer}</option>
          <option value="incorrect">{question.incorrectAnswers[0]}</option>
          <option value="incorrect">{question.incorrectAnswers[1]}</option>
          <option value="incorrect">{question.incorrectAnswers[2]}</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TriviaQuestion;
