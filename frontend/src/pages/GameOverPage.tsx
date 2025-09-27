import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";

const GameOverPage = () => {
  const navigate = useNavigate();

  const { score, questions } = useGameContext();

  return (
    <div>
      <span>
        <h1>Game Over</h1>
        <p>
          Final score: {score}/{questions.length}
        </p>
        <p>Thank you for playing!</p>
      </span>
      <span className="flex flex-col space-y-4 my-4">
        <Button>Try Again</Button>
        <Button onClick={() => navigate("/")}>New Game</Button>
      </span>
    </div>
  );
};

export default GameOverPage;
