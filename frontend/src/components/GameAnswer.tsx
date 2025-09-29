const GameAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="w-full h-50 flex items-center justify-center w-max-full rounded-lg border-2 peer-checked:bg-primary peer-checked:text-white transition">
      <p className="text-2xl p-4">{answer}</p>
    </div>
  );
};

export default GameAnswer;
