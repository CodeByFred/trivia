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
    <div className="mx-auto items-center justify-center flex flex-col gap-4">
      <h1>Welcome to the Trivia Game</h1>
      <p>Test your knowledge with our trivia questions!</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
          gap: "0.5rem",
        }}
      >
        <select
          value={difficulty}
          onChange={(e) => updateDifficulty(e.target.value as Difficulty)}
        >
          <option>Difficulty</option>
          {DIFFICULTIES.map((d, index) => (
            <option key={index} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={categoryID}
          onChange={(e) => updateCategoryID(Number(e.target.value))}
        >
          <option>Category</option>
          {TRIVIA_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleStart}>New Game</Button>
    </div>
  );
};

export default HomePage;
