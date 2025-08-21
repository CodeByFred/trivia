import { useContext } from "react";
import { GameContext } from "../context/GameContext"; // Adjust the import path as needed

const ReviewPage = () => {
  const gameContext = useContext(GameContext);
  const { answeredQuestions } = gameContext || { answeredQuestions: [] };

  return (
    <div>
      <h1>Review Your Answers</h1>
      <p>Here are the questions you answered:</p>
      {/* Display the questions and the user's answers here */}
    </div>
  );
};

export default ReviewPage;
