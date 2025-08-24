import type { Question } from "../types/types";
import TriviaForm from "../containers/TriviaForm";
import { shuffle } from "../utils/utils";

interface TriviaQuestionProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onNext: () => void;
}

const TriviaQuestion = ({ question, index, totalQuestions }: TriviaQuestionProps) => {
  //gather answers to display
  const orderedAnswers = [
    question?.correctAnswer,
    question?.incorrectAnswers[0],
    question?.incorrectAnswers[1],
    question?.incorrectAnswers[2],
  ].filter((a): a is string => typeof a === "string");

  return (
    <div className="flex flex-col items-center  px-4">
      <br />
      <h2>{`Question ${index || ""}/${totalQuestions || ""}`}</h2>
      <p>{question?.question}</p>
      {question && (
        <TriviaForm
          answers={shuffle(orderedAnswers)}
          correctAnswer={question.correctAnswer}
        />
      )}
    </div>
  );
};

export default TriviaQuestion;
