
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/utils";

import TriviaQuestion from "../components/TriviaQuestion";
import TriviaForm from "../containers/TriviaForm";
import GameStatBar from "../components/GameStatBar";
import Button from "../components/Button";

const GamePage = () => {
  const {
    questions,
    incorrectQuestions,
    currentIndex,
    gameState,
    loadNextQuestion,
    submitAnswer,
    score,
    loading,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const isRetryMode = incorrectQuestions.length > 0;

  const activeQuestion = isRetryMode
    ? incorrectQuestions[currentIndex]?.question
    : questions[currentIndex];

  const handleTimeout = () => {
    if (gameState !== "playing") return;
    submitAnswer(null);
    loadNextQuestion();
  };

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

  useEffect(() => {
    if (gameState === "finished") {
      navigate("/gameover");
    }
  }, [gameState, navigate]);

  //todo: move shuffle logic to GameProvider?

  useEffect(() => {
    if (!activeQuestion) return;

    const orderedAnswers = [
      activeQuestion?.correctAnswer,
      activeQuestion?.incorrectAnswers[0],
      activeQuestion?.incorrectAnswers[1],
      activeQuestion?.incorrectAnswers[2],
    ].filter((a): a is string => typeof a === "string");

    setShuffledAnswers(shuffle(orderedAnswers));
  }, [activeQuestion]);

  return (
    <>
      {gameState === "idle" && (
        <div className="flex flex-col items-center justify-center text-center px-4 h-full gap-8">
          <h2>Oops!</h2>
          <p>
            No questions loaded yet. <br />
            Please start a new game on Home Page.
          </p>
          <Button className="btn-primary m-8" onClick={() => navigate("/")}>
            New Game
          </Button>
        </div>
      )}

      {loading === true && (
        <div className="flex flex-col items-center justify-center text-center px-4 h-full gap-8">
          <p>Loading...</p>
          {/* <div className="loader" /> */}
        </div>
      )}

      {gameState === "playing" && activeQuestion && (
        <div className="game-container flex flex-col items-center">
          <GameStatBar timeLeft={timeLeft} score={score} />
          <TriviaQuestion
            question={activeQuestion}
            currentIndex={currentIndex}
          />
          <TriviaForm answers={shuffledAnswers} />
        </div>
      )}
    </>
  );
};

export default GamePage;
