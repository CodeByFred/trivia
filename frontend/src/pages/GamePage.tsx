import { useEffect, useState } from "react";
import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverPage from "./GameOverPage";
import { useGameContext } from "../context/useGameContext";

const GamePage = () => {
  const {
    questions,
    incorrectQuestions,
    currentIndex,
    gameState,
    loadNextQuestion,
    submitAnswer,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);

  const isRetryMode = incorrectQuestions.length > 0;
  const activeQuestion = isRetryMode
    ? incorrectQuestions[currentIndex]?.question
    : questions[currentIndex];

  const handleTimeout = () => {
    if (gameState !== "playing") return;
    submitAnswer(null);
    loadNextQuestion();
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    setTimeLeft(15);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // wait til next tick so render isn't disrupted
          setTimeout(() => handleTimeout(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIndex]);

  return (
    <>
      {gameState === "playing" && <ScoreBoard timeLeft={timeLeft} />}
      <div className="flex flex-col items-center justify-center text-center px-4 h-full">
        {gameState !== "finished" && !activeQuestion && (
          <p>
            No questions loaded yet. <br />
            Please start a new game on Home Page.
          </p>
        )}

        {gameState === "playing" && activeQuestion && (
          <TriviaQuestion question={activeQuestion} index={currentIndex} />
        )}

        {gameState === "finished" && questions.length > 0 && <GameOverPage />}
      </div>
    </>
  );
};

export default GamePage;
