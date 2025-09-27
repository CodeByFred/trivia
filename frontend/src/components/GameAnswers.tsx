type GameAnswersProps = {
  answers: string[];
  selected: string | null;
  setSelected: (answer: string) => void;
};

const GameAnswers = ({ answers, selected, setSelected }: GameAnswersProps) => {
  return (
    <>
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
          <div className="w-100 h-60 flex items-center justify-center rounded-lg bg-gray-200 peer-checked:bg-primary peer-checked:text-white transition">
            <p className="text-2xl">{answer}</p>
          </div>
        </label>
      ))}
    </>
  );
};

export default GameAnswers;
