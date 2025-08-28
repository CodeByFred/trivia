import type { GameResult } from "../types/types";
import { API, GAME_ENDPOINT } from "./urls";

export async function submitGameResult(gameResultDto: GameResult) {
  try {
    const response = await fetch(`${API}${GAME_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameResultDto),
    });

    if (!response.ok) {
      console.error(response);
      throw new Error("Failed to submit game result");
    }

    const result = await response.text();
    return result;
    //return the confirmation message from backend
  } catch (error) {
    console.error(error);
  }
}
