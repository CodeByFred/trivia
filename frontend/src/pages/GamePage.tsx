import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverPage from "./GameOverPage";
import { useGameContext } from "../context/useGameContext";
import { useEffect, useState } from "react";
import { shuffle } from "../utils/utils";
import TriviaForm from "../containers/TriviaForm";

const GamePage = () => {
  const { questions, currentIndex, gameState, loadNextQuestion, submitAnswer } =
    useGameContext();

  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const currentQuestion = questions[currentIndex] || null;

  useEffect(() => {
    if (gameState !== "playing") return;

    setTimeLeft(15);
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
      {gameState === "playing" && <ScoreBoard timeLeft={timeLeft} />}
      <div className="flex flex-col items-center justify-center text-center px-4 h-full">
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
        {gameState === "finished" && questions.length > 0 && <GameOverPage />}
      </div>
    </>
  );
};

export default GamePage;
