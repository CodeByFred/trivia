import { typography } from "../styles/typography";

const Timer = ({
  timeLeft,
  timeLimit,
}: {
  timeLeft: number;
  timeLimit: number;
}) => {
  return (
    <span className="flex flex-row items-center gap-1 w-full">
      <div>
        <p className={typography.body}>{timeLeft}</p>
      </div>

      <div className="timer-bar w-full h-2 bg-stone-900 rounded-full overflow-hidden">
        <div
          className="timer-bar-fill w-full h-full bg-yellow-400 transition-all duration-1000 ease-linear"
          style={{ width: `${(timeLeft / timeLimit) * 100}%` }}
        />
      </div>
    </span>
  );
};

export default Timer;
