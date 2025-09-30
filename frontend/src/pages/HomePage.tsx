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
import { typography } from "../styles/typography";

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
    <div className=" flex flex-col items-center h-fit w-full justify-center gap-8 p-8">
      <Logo />
      <h1 className={typography.h1}>Start New Game</h1>
      <h3 className={typography.h3}>
        Test your knowledge with our trivia questions!
      </h3>

      <div>
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

      <div className="flex flex-col sm:flex-row  items-center justify-center ">
        <Button onClick={handleStart} className="btn-primary">
          Start Game
        </Button>
        <Button onClick={() => navigate("/retry")} className="btn-secondary">
          Retry Mode
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
