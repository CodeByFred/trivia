import { DIFFICULTIES, TRIVIA_CATEGORIES, type Difficulty } from "../types/types";
import Button from "../components/Button";
import { useGameContext } from "../context/useGameContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { difficulty, updateDifficulty, categoryID, updateCategoryID, startGame } =
    useGameContext();

  const handleStart = () => {
    startGame();
    navigate("/game");
  };

  return (
    <div className="items-center justify-center flex flex-col gap-4 px-4 h-full">
      <h1 className="text-5xl">Welcome to the Trivia Game</h1>
      <p className="text-xl">Test your knowledge with our trivia questions!</p>
      <div className="flex flex-col items-center justify-center gap-4">
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
          <span className="label">Category</span>
          <select
            className="select select-xl select-primary"
            value={categoryID}
            onChange={(e) => updateCategoryID(Number(e.target.value))}
          >
            {TRIVIA_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Button onClick={handleStart} className="btn btn-lg btn-primary btn-wide">
        New Game
      </Button>
    </div>
  );
};

export default HomePage;
