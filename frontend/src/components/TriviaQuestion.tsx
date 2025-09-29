import type { Question } from "../types/types";

interface TriviaQuestionProps {
  question: Question;
  currentIndex: number;
}

const TriviaQuestion = ({ question, currentIndex }: TriviaQuestionProps) => {
  return (
    <div className="trivia-question flex flex-col items-center gap-8 m-8">
      {/* questionInfo */}
      <h3 className="text-xl p-2">{`Question ${currentIndex + 1}`}</h3>
      <h2 className="text-4xl p-8">{question?.question}</h2>
    </div>
  );
};

export default TriviaQuestion;
