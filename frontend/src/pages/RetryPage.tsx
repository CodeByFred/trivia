import { useNavigate } from "react-router-dom";
import { DIFFICULTIES, type Difficulty } from "../types/types";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";

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
      <h1 className="text-5xl">Retry Incorrect Questions</h1>
      <p className="text-xl">Re-attempt up to 10 missed previously incorrect questions</p>
      <label className="select select-xl min-w-[565px] select-primary">
        <span className="label">Difficulty</span>
        <select
          className="select select-xl "
          value={difficulty}
          onChange={(e) => updateDifficulty(e.target.value as Difficulty)}
        >
          {DIFFICULTIES.map((d, i) => (
            <option key={i} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <label className="select select-xl min-w-[565px] select-primary">
        <span className="label">Quantity</span>
        <select
          className="select select-xl select-primary"
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
        </select>
      </label>

      <Button
        disabled={quantity === 0}
        onClick={handleStart}
        className="btn btn-lg btn-primary btn-wide"
      >
        New Game
      </Button>
    </div>
  );
};
export default RetryPage;
