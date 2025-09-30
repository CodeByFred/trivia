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
    <section className="flex flex-col items-center justify-center gap-4 w-full h-full text-center px-4">
      <Logo />

      <h1 className="text-5xl">Start New Game</h1>
      <p className="text-xl">Test your knowledge with our trivia questions!</p>

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

      <Button onClick={handleStart} className="btn btn-primary btn-lg btn-wide">
        Start Game
      </Button>
      <Button
        onClick={() => navigate("/retry")}
        className="btn btn-secondary btn-lg btn-wide"
      >
        Retry Mode
      </Button>
    </section>
  );
};

export default HomePage;
