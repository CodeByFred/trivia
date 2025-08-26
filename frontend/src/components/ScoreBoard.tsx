// need to add context for score

const ScoreBoard = () => {
  return (
    <div className="score-board flex flex-row justify-between items-center gap-2 py-2 px-4 bg-gray-200 rounded-lg">
      <p>{`Score: Enter code for score here...`}</p>
      <p>{`Timer: 00:00`}</p>
    </div>
  );
};

export default ScoreBoard;
