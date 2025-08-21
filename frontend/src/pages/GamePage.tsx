import { useContext, useEffect, useState } from "react";
import type { Question } from "../types/types";
import { shuffle } from "../utils/utils";
import TriviaForm from "../containers/TriviaForm";
import { GameContext } from "../context/GameContext";
import Button from "../components/Button";

type GamePageProps = {
  loading: boolean;
  error: string | null;
}

const GamePage = ({ loading, error }: GamePageProps) => {
  const gameContext = useContext(GameContext);
  const {
    questions,
    currentQuestion,
    score,
    questionCount = 0,
  } = gameContext || {};

  return (
    <>
      {!loading && questions.length == 0 && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}
      {loading && <p>{loading}</p>}
      {error && <p>{error}</p>}

      {questions?.map((q, i) => (
        <div key={i}>
          <TriviaQuestion question={q} count={i + 1} />
        </div>
      ))}
    </>
  );
};

export default Game;
