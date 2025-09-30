import {
  DIFFICULTIES,
  TRIVIA_CATEGORIES,
  type Difficulty,
} from "../types/types";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Selector from "../components/Selector";
import Card from "../components/Card";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    difficulty,
    updateDifficulty,
    categoryID,
    updateCategoryID,
    startGame,
  } = useGameContext();

  const handleStart = () => {
    startGame();
    navigate("/game");
  };

  return (
    <>
      <Logo />

      <h1 className="text-5xl">Start New Game</h1>
      <h2>Test your knowledge with our trivia questions!</h2>

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
          label="Category"
          value={categoryID}
          onChange={(e) => updateCategoryID(Number(e.target.value))}
        >
          {TRIVIA_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Selector>
      </div>

      <div className="flex flex-col sm:flex-row w-full h-full items-center justify-center ">
        <Button onClick={handleStart} className="btn-primary">
          Start Game
        </Button>
        <Button onClick={() => navigate("/retry")} className="btn-secondary">
          Retry Mode
        </Button>
      </div>
    </>
  );
};

export default HomePage;
