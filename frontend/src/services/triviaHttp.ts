import type {
  Difficulty,
  Question,
  TriviaAPIResponse,
  TriviaAPIResponseQuestion,
} from "../types/types";

// decode HTML entities like &rsquo; -> ’
function decodeHtml(s: string): string {
  const el = document.createElement("textarea");
  el.innerHTML = s;
  return el.value;
}

// map TriviaAPI format to the "Question" format that is used internally
function mapTriviaAPIResponseQuestion(apiResponse: TriviaAPIResponseQuestion): Question {
  return {
    type: apiResponse.type,
    difficulty: apiResponse.difficulty,
    category: decodeHtml(apiResponse.category),
    question: decodeHtml(apiResponse.question),
    correctAnswer: decodeHtml(apiResponse.correct_answer),
    incorrectAnswers: apiResponse.incorrect_answers.map(decodeHtml),
  };
}

// uses reponse codes supplied by TriviaAPI
export async function triviaQuery(
  amount: number,
  difficulty: Difficulty,
  category: number,
  token?: string
): Promise<Question[]> {
  const safeAmount = Math.max(1, Math.min(50, amount));
  const params = new URLSearchParams({ amount: String(safeAmount), type: "multiple" });

  if (difficulty !== "any") params.set("difficulty", difficulty);
  if (category !== 0) params.set("category", String(category));
  if (token) params.set("token", token);

  const url = `https://opentdb.com/api.php?${params.toString()}`;

  console.log(url);

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Problem with fetch function");
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json: TriviaAPIResponse = await response.json();

  switch (json.response_code) {
    case 0:
      return json.results.map(mapTriviaAPIResponseQuestion);
    case 1:
      throw new Error("No results: Not enough questions for your query.");
    case 2:
      throw new Error("Invalid parameter: Check amount, difficulty, or category.");
    case 3:
      throw new Error("Token not found: Session token does not exist.");
    case 4:
      throw new Error(
        "Token empty: You've seen all possible questions. Reset the token."
      );
    case 5:
      throw new Error("Rate limit: Too many requests. Wait 5 seconds and try again.");
    default:
      throw new Error(`Unexpected response code: ${json.response_code}`);
  }
}
