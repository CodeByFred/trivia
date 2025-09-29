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
    incorrectQuestions,
    currentIndex,
    gameState,
    loadNextQuestion,
    submitAnswer,
    score,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);
  const currentQuestion = questions[currentIndex] || null;
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
      {questions.length != 0 && gameState === "playing" && (
        <GameStatBar timeLeft={timeLeft} score={score} />
      )}

      {questions.length == 0 && gameState !== "finished" && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}

      {gameState === "playing" && (currentQuestion || activeQuestion) && (
        <div className="game-container flex flex-col items-center">
          <TriviaQuestion currentIndex={currentIndex} />
          <TriviaForm answers={shuffledAnswers} />
        </div>
      )}
    </>
  );
};

export default GamePage;

// <div className="flex flex-col items-center justify-center text-center px-4 h-full">
//   {gameState !== "finished" && !activeQuestion && (
//     <p>
//       No questions loaded yet. <br />
//       Please start a new game on Home Page.
//     </p>
//   )}
// </div>

// {gameState === "playing" && activeQuestion && (
//   <TriviaQuestion question={activeQuestion} index={currentIndex} />
// )}
