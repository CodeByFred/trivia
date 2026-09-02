import { typography } from "../styles/typography";

const Score = ({ score }: { score: number }) => {
  return (
    <span className="flex flex-row items-center gap-2">
      <img className="w-6 h-6" src="icons/coin-lg.svg" alt="Score Icon" />

      <p className={typography.body}>{score}</p>
    </span>
  );
};

export default Score;
