import Score from "./Score";
import Timer from "./Timer";

type GameStatBarProps = {
  timeLeft: number;
  timeLimit: number;
  score: number;
};

const GameStatBar = ({ timeLeft, score, timeLimit }: GameStatBarProps) => {
  return (
    <div className="game-stat-bar flex flex-row w-150 max-w-full justify-between items-center gap-2 py-2 px-4 rounded-lg">
      <Timer timeLeft={timeLeft} timeLimit={timeLimit} />
      <Score score={score} />
    </div>
  );
};

export default GameStatBar;
