import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";
import { typography } from "../styles/typography";

const GameOverPage = () => {
  const navigate = useNavigate();

  const { score } = useGameContext();

  return (
    <div className=" flex flex-col items-center h-full w-full justify-center">
      <span className="flex justify-center m-8">
        <h1 className={typography.h1}>Game Over</h1>
      </span>
      <h3 className={typography.h3}>Final score</h3>
      <div className="flex flex-row mt-4">
        <img src="../../icons/coin.svg" alt="coin" className="h-full w-full" />
        <h3 className={typography.h3}>{score}</h3>
      </div>
      <div className="flex flex-wrap justify-center space-y-4 m-8">
        <Button onClick={() => navigate("/")} className="btn-primary">
          New Game
        </Button>
        <Button onClick={() => navigate("/retry")} className="btn-secondary">
          Retry Mode
        </Button>
      </div>
    </div>
  );
};

export default GameOverPage;
