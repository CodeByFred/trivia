import type { GameResult } from "../types/types";

const GameLog = ({
  game,
  showingAnswers,
}: {
  game: GameResult;
  showingAnswers: boolean;
}) => {
  return (
    <div className="border p-4 m-4 rounded-md shadow-md ">
      <h2 className="p-2 bg-black text-white text-center">
        Game played on: {new Date(game.datePlayed).toLocaleString()}
      </h2>
      {game.answers.map((entry, i) => (
        <div key={i} className="border-t py-2">
          <p className="font-bold ">{game.questions[i].question}</p>
          <div className=" flex flex-row gap-4">
            <p>Your answer: {entry.submitted}</p>
            <p className={entry.wasCorrect ? "text-green-500" : "text-red-500"}>
              {entry.wasCorrect ? "(Correct)" : "(Incorrect)"}
            </p>
          </div>
          {showingAnswers && entry.wasCorrect === false && (
            <p>Correct answer: {game.questions[i].correctAnswer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameLog;
