import { typography } from "../styles/typography";

const GameAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="w-full h-full p-2 flex items-center justify-center w-max-full rounded-lg border-2 peer-checked:bg-primary peer-checked:text-white transition">
      <p className={typography.body}>{answer}</p>
    </div>
  );
};

export default GameAnswer;
