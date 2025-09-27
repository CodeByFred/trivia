import { useGameContext } from "../context/useGameContext";

interface TriviaQuestionProps {
  currentIndex: number;
}

const TriviaQuestion = ({ currentIndex }: TriviaQuestionProps) => {
  const { questions } = useGameContext();
  const currentQuestion = questions[currentIndex];

  return (
    <>
      <h3 className="text-xl">{`Question ${currentIndex + 1 || ""}/${
        questions.length || ""
      }`}</h3>
      <p className="text-4xl">{currentQuestion?.question}</p>
    </>
  );
};

export default TriviaQuestion;
