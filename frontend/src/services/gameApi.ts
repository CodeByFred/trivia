import type {
  Difficulty,
  FinalGameDto,
  RetryQuestion,
  RetryQuestionResponse,
} from "../types/types";
import { API, GAME_ENDPOINT, GAMEANSWER_ENDPOINT } from "./urls";

export async function postGameData(dto: FinalGameDto) {
  try {
    console.log("Sending over game results...");
    const response = await fetch(`${API}${GAME_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to post completed game data to database.");
    }

    console.log("Response Status: " + response.status);
    console.log(response);

    const result = await response.text();
    console.log("Game answers saved: ");
    console.log(result);

    return result; //return the confirmation message from backend
  } catch (error) {
    console.error(error);
  }
}

export async function requestRetryQuestions(
  difficulty: Difficulty,
  quantity: number
): Promise<RetryQuestion[]> {
  const safeAmount = Math.max(1, Math.min(10, quantity));
  const params = new URLSearchParams({
    archived: "false",
    wasCorrect: "false",
    quantity: String(safeAmount),
  });

  if (difficulty !== "any") params.set("difficulty", difficulty);

  const url = `${API}${GAMEANSWER_ENDPOINT}?${params.toString()}`;

  console.log(url);

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Problem retriving questions from database");
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json: RetryQuestion[] = await response.json();

  return json;
}

export async function updateRetryGameAnswer(dto: RetryQuestionResponse) {
  try {
    console.log("Sending over game results...");
    const response = await fetch(`${API}${GAME_ENDPOINT}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to PATCH retry question.");
    }

    console.log("Response Status: " + response.status);
    console.log(response);

    const result = await response.text();
    console.log("Retry Question GameAnswer saved: ");
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}
