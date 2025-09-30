import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/utils";

import TriviaQuestion from "../components/TriviaQuestion";
import TriviaForm from "../containers/TriviaForm";
import GameStatBar from "../components/GameStatBar";
import Button from "../components/Button";
import type { Question, RetryQuestion } from "../types/types";

const GamePage = () => {
  const {
    questions,
    incorrectQuestions,
    currentIndex,
    gameState,
    submitAnswer,
    score,
    loading,
  } = useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  const navigate = useNavigate();

  const isRetryMode = incorrectQuestions.length > 0;

  const retryQ: RetryQuestion | undefined = isRetryMode
    ? incorrectQuestions[currentIndex]
    : undefined;

  const normalQ: Question | undefined = !isRetryMode
    ? questions[currentIndex]
    : undefined;

  const actualQuestion: Question | undefined = isRetryMode ? retryQ?.question : normalQ;

  useEffect(() => {
    if (loading || gameState !== "playing" || !actualQuestion) return;

    setTimeLeft(15);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setTimeout(() => {
            console.log("Timer expired, submitting null for:");

            submitAnswer(null, retryQ ?? normalQ!);
          }, 0);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIndex, normalQ, loading, retryQ]);

  useEffect(() => {
    if (gameState === "finished") {
      navigate("/gameover");
    }
  }, [gameState, navigate]);

  useEffect(() => {
    if (!actualQuestion) return;

    const orderedAnswers = [
      actualQuestion?.correctAnswer,
      actualQuestion?.incorrectAnswers[0],
      actualQuestion?.incorrectAnswers[1],
      actualQuestion?.incorrectAnswers[2],
    ].filter((a): a is string => typeof a === "string");

    setShuffledAnswers(shuffle(orderedAnswers));
  }, [actualQuestion]);

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

      {gameState === "playing" && actualQuestion && (
        <div className="game-container flex flex-col items-center">
          <GameStatBar timeLeft={timeLeft} score={score} />
          <TriviaQuestion question={actualQuestion} currentIndex={currentIndex} />
          <TriviaForm
            answers={shuffledAnswers}
            activeQuestion={isRetryMode ? retryQ! : normalQ!}
          />
        </div>
      )}
    </>
  );
};

export default GamePage;
