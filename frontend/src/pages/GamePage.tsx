import TriviaQuestion from "../components/TriviaQuestion";
import type { Question } from "../types/types";

interface GameProps {
  questions: Question[];
  loading: boolean;
  error: string | null;
}

const Game = ({ questions, loading, error }: GameProps) => {
  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {!loading && questions.length == 0 && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}
      {loading && <p>{loading}</p>}
      {error && <p>{error}</p>}

      {questions?.map((q, i) => (
        <div key={i}>
          <TriviaQuestion question={q} count={i + 1} />
        </div>
      ))}
    </>
  );
};

export default Game;
