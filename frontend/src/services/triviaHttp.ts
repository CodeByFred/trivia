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
  token: string
): Promise<Question[]> {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple&token=${token}`;

  const res = await fetch(url);
  const json: TriviaAPIResponse = await res.json();

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
