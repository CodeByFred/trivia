type ScoreBoardProps = {
  timeLeft: number;
};

import { useGameContext } from "../context/useGameContext";

const ScoreBoard = ({ timeLeft }: ScoreBoardProps) => {
  const { score } = useGameContext();
  return (
    <div className="score-board flex flex-row justify-between items-center gap-2 py-2 px-4 bg-gray-200 rounded-lg">
      <p>{`Score: ${score}`}</p>
      <p>{`Timer: ${timeLeft}`}</p>
    </div>
  );
};

export default ScoreBoard;
