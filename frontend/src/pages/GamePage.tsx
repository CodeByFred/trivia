import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverModal from "../components/GameOverModal";
import { useGameContext } from "../context/useGameContext";
import { useEffect } from "react";

const GamePage = () => {
  const { questions, currentIndex, gameState, resetGame, loadNextQuestion } =
    useGameContext();

  useEffect(() => {
    if (gameState === "finished") {
      console.log(`Game state: '${gameState}'. Game Over! Displaying results...`);
    }
    if (gameState === "playing") {
      console.log(`Game state: '${gameState}'. Game in progress...`);
    }
    if (gameState === "idle") {
      console.log(`Game state: '${gameState}'. Game is idle. Please start a new game.`);
    }
  }, [gameState]);

  return (
    <>
      {}
      {gameState === "playing" && <ScoreBoard />}
      <div className="flex flex-col items-center justify-center text-center px-4 h-full gap-8">
        {questions.length == 0 && gameState !== "finished" && (
          <p>
            No questions loaded yet. <br />
            Please start a new game on Home Page.
          </p>
        )}

        {gameState === "playing" && (
          <TriviaQuestion
            question={questions[currentIndex]}
            index={currentIndex}
            totalQuestions={questions.length}
            onNext={loadNextQuestion}
          />
        )}
        {gameState === "finished" && questions.length > 0 && (
          <GameOverModal resetGame={resetGame} />
        )}
      </div>
    </>
  );
};

export default GamePage;
