import "./App.scss";
import { useEffect, useState } from "react";
import { triviaQuery } from "./services/triviaHttp";
import type { Question } from "./types/types";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await triviaQuery(2, "easy", 9);
        setQuestions(data);
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {questions.map((q, i) => (
        <div key={i}>
          <h3>{q.question}</h3>
          <ul>
            {[q.correctAnswer, ...q.incorrectAnswers].map((ans, index) => (
              <li key={index}>{ans}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
