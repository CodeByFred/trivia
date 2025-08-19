import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DIFFICULTIES,
  TRIVIA_CATEGORIES,
  type Difficulty,
} from "../types/types";
import Button from "../components/Button";

interface HomePageProps {
  loadQuestions: (
    amount: number,
    difficult: Difficulty,
    category: number
  ) => void;
}

const HomePage = ({ loadQuestions }: HomePageProps) => {
  const [difficulty, setDifficulty] = useState<Difficulty>();
  const [categoryID, setCategoryID] = useState<number>();

  const navigate = useNavigate();

  const newGame = () => {
    if (difficulty && categoryID) {
      loadQuestions(1, difficulty, categoryID);
      navigate("/game");
    }
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
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
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
          onChange={(e) => setCategoryID(Number(e.target.value))}
        >
          <option>Category</option>
          {TRIVIA_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={newGame}>New Game</Button>
    </div>
  );
};

export default HomePage;
