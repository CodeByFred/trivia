import TriviaQuestion from "../components/TriviaQuestion/TriviaQuestion";
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
          <TriviaQuestion question={q} count={i} />
        </div>
      ))}
    </>
  );
};

export default Game;
