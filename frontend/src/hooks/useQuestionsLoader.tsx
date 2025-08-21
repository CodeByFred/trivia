import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";
import { triviaQuery } from "../services/triviaHttp";
import { getOrCreateToken, resetToken } from "../services/sessionToken";
import type { Difficulty } from "../types/types";

const useQuestionsLoader = () => {
  const { questions, setQuestions } = useGameContext();
  const [token, setToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sends API request to obtain token once application starts
  useEffect(() => {
    getOrCreateToken()
      .then(setToken)
      .catch(() => setError("Failed to retrieve token"));
  }, []);

  const loadQuestions = async (
    amount: number,
    difficulty: Difficulty,
    category: number
  ) => {
    if (!token) {
      setError("Token missing");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log(token);
      const data = await triviaQuery(amount, difficulty, category, token);
      if (setQuestions) setQuestions(data);
    } catch {
      /*
      If all the questions have been asked the game needs to end or player picks from a different category because the token is exausted (Would be response code 4).
      This is already being caught in triviaHttp but need to think of a longer term solution
      */
      if (
        error?.includes(
          "Token empty: You've seen all possible questions. Reset the token."
        )
      ) {
        await resetToken(token);
        const data = await triviaQuery(amount, difficulty, category, token);
        if (setQuestions) setQuestions(data);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loadQuestions,
  };
};

export default useQuestionsLoader;
