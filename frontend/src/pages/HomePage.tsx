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
    <>
      <Logo />
      <p className="text-xl">Test your knowledge with our trivia questions!</p>
      <section className="flex flex-col items-center justify-center gap-4">
        <Selector label="Difficulty">
          <select
            className="select select-xl"
            value={difficulty}
            onChange={(e) => updateDifficulty(e.target.value as Difficulty)}
          >
            {DIFFICULTIES.map((d, i) => (
              <option key={i} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
        </Selector>

        <Selector label="Category">
          <select
            className="select select-xl"
            value={categoryID}
            onChange={(e) => updateCategoryID(Number(e.target.value))}
          >
            {TRIVIA_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </Selector>
      </section>
      <div className="mt-8">
        <Button onClick={handleStart}>New Game</Button>
      </div>
    </>
  );
};

export default HomePage;
