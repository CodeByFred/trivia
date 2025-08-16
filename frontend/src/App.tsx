import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import { triviaQuery } from "./services/triviaHttp";
import type { Difficulty, Question } from "./types/types";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuestions = async (
    amount: number,
    difficulty: Difficulty,
    category: number
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await triviaQuery(amount, difficulty, category);
      setQuestions(data);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   loadQuestions();
  // }, []);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<HomePage loadQuestions={loadQuestions} />}
          />
          <Route
            path="/game"
            element={
              <GamePage questions={questions} loading={loading} error={error} />
            }
          />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
