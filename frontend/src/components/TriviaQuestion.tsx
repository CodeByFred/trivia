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
    <>
      <h3 className="text-xl">{`Question ${index + 1 || ""}/${totalQuestions || ""}`}</h3>
      <p className="text-4xl">{question?.question}</p>
      {question && (
        <TriviaForm
          answers={shuffle(orderedAnswers)}
          correctAnswer={question.correctAnswer}
        />
      )}
    </>
  );
};

export default TriviaQuestion;
