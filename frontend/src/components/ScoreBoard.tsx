type ScoreBoardProps = {
  userScore: number;
};

const ScoreBoard = ({ userScore }: ScoreBoardProps) => {
  return (
    <div className="score-board flex flex-row justify-between items-center gap-2 py-2 px-4 bg-gray-200 rounded-lg">
      <p>{`Score: ${userScore}`}</p>
      <p>{`Timer: 00:00`}</p>
    </div>
  );
};

export default ScoreBoard;
