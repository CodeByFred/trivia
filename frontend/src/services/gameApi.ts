import type { GameResultDto, GameQuestionsDto } from "../types/types";
import { API, GAME_ENDPOINT } from "./urls";

export async function postGameData(dto: GameResultDto | GameQuestionsDto) {
  try {
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

    const result = await response.text();
    return result; //return the confirmation message from backend
  } catch (error) {
    console.error(error);
  }
}
