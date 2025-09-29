import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";

const GameOverPage = () => {
  const navigate = useNavigate();

  const { score, questions } = useGameContext();

  return (
    <div className="flex flex-col items-center ">
      <span className="flex justify-center m-8">
        <h1 className="text-4xl font-bold">Game Over</h1>
      </span>
      <h2 className="text-2xl m-4">Final score</h2>
      <p>
        {score}/{questions.length}
      </p>
      <div className="flex flex-wrap justify-center space-y-4 m-8">
        <Button onClick={() => navigate("/")}>New Game</Button>
        <Button onClick={() => navigate("/retry")}>Retry Mode</Button>
      </div>
    </div>
  );
};

export default GameOverPage;
