import { typography } from "../styles/typography";
import type { Question } from "../types/types";
import Tag from "./Tag";

interface TriviaQuestionProps {
  question: Question;
  currentIndex: number;
  points: number;
}

const TriviaQuestion = ({
  question,
  currentIndex,
  points,
}: TriviaQuestionProps) => {
  return (
    <div className="trivia-question flex flex-col text-wrap items-center gap-8 m-8 w-8/10">
      <h2 className={typography.h2}>{`Question ${currentIndex + 1}`}</h2>
      <h3 className={typography.h3}>{question?.question}</h3>
      <div className="flex flex-row flex-wrap items-center justify-center w-full h-fit gap-2">
        <Tag>{question.category}</Tag>
        <Tag>{`${question.difficulty} ${points} points`}</Tag>
      </div>
    </div>
  );
};

export default TriviaQuestion;
