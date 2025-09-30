import { useNavigate } from "react-router-dom";
import { DIFFICULTIES, type Difficulty } from "../types/types";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import RetryOverview from "../components/RetryOverview";
import Selector from "../components/Selector";
import Logo from "../components/Logo";

const RetryPage = () => {
  const navigate = useNavigate();
  const { difficulty, updateDifficulty, retryGame, quantity, updateQuantity } =
    useGameContext();

  const handleStart = () => {
    retryGame();
    navigate("/game");
  };

  return (
    <div className="items-center justify-center flex flex-col gap-4 px-4 h-full">
      <Logo />
      <h1 className="text-5xl">Retry Incorrect Questions</h1>

      <RetryOverview />

      <Selector
        label="Difficulty"
        value={difficulty}
        onChange={(e) => updateDifficulty(e.target.value as Difficulty)}
      >
        {DIFFICULTIES.map((d, i) => (
          <option key={i} value={d}>
            {d.charAt(0).toUpperCase() + d.slice(1)}
          </option>
        ))}
      </Selector>

      <Selector
        label="Quantity"
        value={quantity}
        onChange={(e) => updateQuantity(Number(e.target.value))}
      >
        <option value={0} disabled>
          Select Number of Questions
        </option>
        {[...Array(10)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </Selector>

      <Button
        disabled={quantity === 0}
        onClick={handleStart}
        className="btn btn-primary btn-lg btn-wide"
      >
        Start Game
      </Button>

      <Button
        onClick={() => navigate("/")}
        className="btn btn-secondary btn-lg btn-wide"
      >
        Go Back
      </Button>
    </div>
  );
};
export default RetryPage;
