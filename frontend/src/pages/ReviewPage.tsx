import { useGameContext } from "../context/useGameContext";
import GameLog from "../components/GameLog";

const ReviewPage = () => {
  const { gameHistory } = useGameContext();

  return (
    <div className="mx-auto items-center flex flex-col gap-4 p-4 h-full overflow-y-auto">
      <div>
        <h1>Review Your Answers</h1>
        <p>Here are the questions you answered:</p>
      </div>
      <div className="overflow-clip  ">
        {gameHistory.length === 0 && (
          <p>No answers to review. Start a new game!</p>
        )}
        {gameHistory.length > 0 &&
          gameHistory.map((game, i) => <GameLog key={i} game={game} />)}
      </div>
    </div>
  );
};

export default ReviewPage;
