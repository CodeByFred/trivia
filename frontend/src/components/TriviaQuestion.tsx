import { typography } from "../styles/typography";
import type { Question } from "../types/types";

interface TriviaQuestionProps {
  question: Question;
  currentIndex: number;
}

const TriviaQuestion = ({ question, currentIndex }: TriviaQuestionProps) => {
  return (
    <div className="trivia-question flex flex-col text-wrap items-center gap-8 m-8 w-8/10">
      {/* questionInfo */}
      <h2 className={typography.h2}>{`Question ${currentIndex + 1}`}</h2>
      <h3 className={typography.h3}>{question?.question}</h3>
    </div>
  );
};

export default TriviaQuestion;
