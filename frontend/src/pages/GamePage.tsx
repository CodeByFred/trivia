import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Question } from "../types/types";
import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverModal from "../components/GameOverModal";

interface GameProps {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const Game = ({ questions, loading, error }: GameProps) => {
  const navigate = useNavigate();

  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const [userScore, setUserScore] = useState(0);

  const [index, setIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (index > totalQuestions) {
      setGameOver(true);
    }
  }, [index, totalQuestions]);

  const resetGame = () => {
    setUserScore(0);
    setIndex(0);
    setGameOver(false);
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {!gameOver && <ScoreBoard userScore={userScore} />}

      {!loading && questions.length == 0 && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}

      {loading && <p>{loading}</p>}
      {error && <p>{error}</p>}

      {!gameOver && (
        <TriviaQuestion
          question={questions[index]}
          index={index + 1}
          setIndex={setIndex}
          totalQuestions={totalQuestions}
          setUserScore={setUserScore}
        />
      )}
      {gameOver && totalQuestions > 0 && (
        <GameOverModal resetGame={resetGame} navigate={navigate} />
      )}
    </>
  );
};

export default Game;
