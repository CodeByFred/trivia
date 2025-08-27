import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useGameContext } from "../context/useGameContext";

const GameOverModal = ({ resetGame }: { resetGame: () => void }) => {
  const navigate = useNavigate();

  const { score, questions } = useGameContext();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <span className="flex flex-col text-center  ">
          <h1>Game Over</h1>
          <p>
            Final score: {score}/{questions.length}
          </p>
          <p>Thank you for playing!</p>
        </span>
        <span className="flex flex-col space-y-4 my-4">
          <Button onClick={resetGame}>Try Again</Button>
          <Button onClick={() => navigate("/")}>New Game</Button>
          <Button onClick={() => navigate("/review")}>Review Answers</Button>
        </span>
      </div>
    </div>
  );
};

export default GameOverModal;
