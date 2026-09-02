import { useNavigate } from "react-router-dom";
import { DIFFICULTIES, type Difficulty } from "../types/types";
import { useGameContext } from "../context/useGameContext";
import Button from "../components/Button";
import RetryOverview from "../components/RetryOverview";
import Selector from "../components/Selector";
import Logo from "../components/Logo";
// import Modal from "../components/Modal";
// import { useState } from "react";
import { typography } from "../styles/typography";

const RetryPage = () => {
  // const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { difficulty, updateDifficulty, retryGame, quantity, updateQuantity } =
    useGameContext();

  const handleStart = () => {
    retryGame();
    navigate("/game");
  };

  return (
    <div className=" flex flex-col items-center h-fit w-full justify-center gap-8 p-8">
      <Logo />

      <h1 className={typography.h1}>Retry Incorrect Questions</h1>

      <div className="justify-center items-center flex flex-col space-y-2">
        <RetryOverview />
      </div>

      <div className="w-full">
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
      </div>

      <div className="flex flex-col sm:flex-row w-full h-full items-center justify-center">
        <Button
          disabled={quantity === 0}
          onClick={handleStart}
          className="btn-primary"
        >
          Start Game
        </Button>
        <Button onClick={() => navigate("/")} className="btn-secondary">
          Go Back
        </Button>
      </div>
    </div>
  );
};
export default RetryPage;
