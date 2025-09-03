import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverModal from "../components/GameOverModal";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";

const GamePage = () => {
  const {
    questions,
    currentIndex,
    gameState,
    resetGame,
    loadNextQuestion,
    scoreAnswer,
    saveAnswer,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    if (gameState !== "playing") return;

    setTimeLeft(15);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const result = scoreAnswer(null);
          if (result) saveAnswer(result);
          loadNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIndex, scoreAnswer, saveAnswer, loadNextQuestion]);

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
      {gameState === "playing" && <ScoreBoard timeLeft={timeLeft} />}
      <div className="flex flex-col items-center justify-center text-center px-4 h-full">
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
