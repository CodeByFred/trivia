import type { Question } from "../types/types";
import TriviaForm from "../containers/TriviaForm";
import { shuffle } from "../utils/utils";

interface TriviaQuestionProps {
  question: Question;
  count?: number;
}

const TriviaQuestion = ({ question, count }: TriviaQuestionProps) => {
  //gather answers to display
  const orderedAnswers = [
    question.correctAnswer,
    question.incorrectAnswers[0],
    question.incorrectAnswers[2],
    question.incorrectAnswers[1],
  ];

  //randomise display order so correct answer isn't obvious
  const shuffledAnswers = shuffle(orderedAnswers);

  return (
    <div className="flex flex-col items-center  px-4">
      <br />
      <h2>{`Question ${count || ""}`}</h2>
      <p>{question.question}</p>
      <TriviaForm
        answers={shuffledAnswers}
        correctAnswer={question.correctAnswer}
      />
    </div>
  );
};

export default TriviaQuestion;
