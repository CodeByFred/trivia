import { useNavigate } from "react-router-dom";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";
import {
  calculatePointsFromDifficulty,
  orderAnswersIntoArray,
  shuffleAnswers,
} from "../utils/utils";

import TriviaQuestion from "../components/TriviaQuestion";
import TriviaForm from "../containers/TriviaForm";
import GameStatBar from "../components/GameStatBar";
import Button from "../components/Button";
import type { Question, RetryQuestion } from "../types/types";
import { typography } from "../styles/typography";
import Logo from "../components/Logo";

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
  const [points, setPoints] = useState(0);

  const navigate = useNavigate();

  const isRetryMode = incorrectQuestions.length > 0;
  const timeLimit = 10; //timer limit in seconds

  const retryQ: RetryQuestion | undefined = isRetryMode
    ? incorrectQuestions[currentIndex]
    : undefined;

  const normalQ: Question | undefined = !isRetryMode
    ? questions[currentIndex]
    : undefined;

  const actualQuestion: Question | undefined = isRetryMode
    ? retryQ?.question
    : normalQ;

  useEffect(() => {
    //TIMER LOGIC
    if (loading || gameState !== "playing" || !actualQuestion) return;

    setTimeLeft(timeLimit);

    const interval = setInterval(() => {
      //timer countdown

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          setTimeout(() => {
            // When timer runs out = submits a null gameAnswer
            console.log("Timer expired, submitting null for:");
            submitAnswer(null, retryQ ?? normalQ!);
          }, 500);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, currentIndex, normalQ, loading, retryQ]);

  useEffect(() => {
    // NAV to GAME OVER when done
    if (gameState === "finished") {
      navigate("/gameover");
    }
  }, [gameState, navigate]);

  useEffect(() => {
    // Calculate points and shuffle answer order
    if (!actualQuestion) return;
    setPoints(calculatePointsFromDifficulty(actualQuestion));
    setShuffledAnswers(shuffleAnswers(orderAnswersIntoArray(actualQuestion)));
  }, [actualQuestion]);

  return (
    <>
      {gameState === "idle" && (
        <div className="content-overlay flex flex-col items-center justify-center text-center p-4 h-full gap-8">
          <h2 className={typography.h2}>Oops!</h2>
          <p className={typography.body}>
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
          <Logo />
          <h2 className={typography.h3}>Loading...</h2>
        </div>
      )}

      {gameState === "playing" && actualQuestion && (
        <div className="game-container flex flex-col items-center h-full w-full">
          <GameStatBar
            timeLeft={timeLeft}
            timeLimit={timeLimit}
            score={score}
          />

          <div className=" flex flex-col items-center h-full w-full justify-center">
            <TriviaQuestion
              question={actualQuestion}
              currentIndex={currentIndex}
              points={points}
            />
            <TriviaForm
              correctAnswer={actualQuestion.correctAnswer}
              answers={shuffledAnswers}
              activeQuestion={isRetryMode ? retryQ! : normalQ!}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
