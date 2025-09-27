import GameAnswer from "./GameAnswer";

type GameAnswersProps = {
  answers: string[];
  selected: string | null;
  setSelected: (answer: string) => void;
};

const GameAnswers = ({ answers, selected, setSelected }: GameAnswersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {answers.map((answer: string, i: number) => (
        <label key={i} className="cursor-pointer">
          <input
            id={`choice${i}`}
            type="radio"
            name="trivia-choice"
            value={answer}
            checked={selected === answer}
            onChange={(e) => setSelected(e.target.value)}
            className="peer hidden"
          />
          <GameAnswer answer={answer} />
        </label>
      ))}
    </div>
  );
};

export default GameAnswers;
