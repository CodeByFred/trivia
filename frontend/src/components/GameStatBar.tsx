import Score from "./Score";
import Timer from "./Timer";

type GameStatBarProps = {
  timeLeft: number;
  score: number;
};

const GameStatBar = ({ timeLeft, score }: GameStatBarProps) => {
  return (
    <div className="game-stat-bar flex flex-row w-150 max-w-full justify-between items-center gap-2 py-2 px-4 rounded-lg">
      <Timer timeLeft={timeLeft} />
      <Score score={score} />
    </div>
  );
};

export default GameStatBar;
