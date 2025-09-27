import { useGameContext } from "../context/useGameContext";

interface TriviaQuestionProps {
  currentIndex: number;
}

const TriviaQuestion = ({ currentIndex }: TriviaQuestionProps) => {
  const { questions } = useGameContext();
  const currentQuestion = questions[currentIndex];

  return (
    <div className="trivia-question flex flex-col items-center gap-8 m-8">
      {/* questionInfo */}
      <h3 className="text-xl p-2">{`Question ${currentIndex + 1 || ""}/${
        questions.length || ""
      }`}</h3>
      <h2 className="text-4xl p-8">{currentQuestion?.question}</h2>
    </div>
  );
};

export default TriviaQuestion;
