import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/utils";

import TriviaQuestion from "../containers/TriviaQuestion";
import TriviaForm from "../containers/TriviaForm";
import GameStatBar from "../components/GameStatBar";

const GamePage = () => {
  const {
    questions,
    currentIndex,
    gameState,
    loadNextQuestion,
    submitAnswer,
    score,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(1500);
  const currentQuestion = questions[currentIndex] || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState !== "playing") return;

    setTimeLeft(1500);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          submitAnswer(null);
          loadNextQuestion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIndex, submitAnswer, loadNextQuestion]);

  useEffect(() => {
    if (gameState === "finished" && questions.length > 0) {
      navigate("/gameover");
    }
  }, [gameState, questions.length, navigate]);

  //todo: move shuffle logic to GameProvider?
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (!currentQuestion) return;

    const orderedAnswers = [
      currentQuestion?.correctAnswer,
      currentQuestion?.incorrectAnswers[0],
      currentQuestion?.incorrectAnswers[1],
      currentQuestion?.incorrectAnswers[2],
    ].filter((a): a is string => typeof a === "string");

    setShuffledAnswers(shuffle(orderedAnswers));
  }, [currentQuestion]);

  return (
    <>
      {gameState === "playing" && (
        <GameStatBar timeLeft={timeLeft} score={score} />
      )}

      {questions.length == 0 && gameState !== "finished" && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}

      {gameState === "playing" && currentQuestion && (
        <>
          <TriviaQuestion currentIndex={currentIndex} />
          <TriviaForm answers={shuffledAnswers} />
        </>
      )}
    </>
  );
};

export default GamePage;
