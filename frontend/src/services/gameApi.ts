import type { FinalGameDto } from "../types/types";
import { API, GAME_ENDPOINT } from "./urls";

export async function postGameData(dto: FinalGameDto) {
  try {
    console.log("Sending over game results to: " + `${API}${GAME_ENDPOINT}`);
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
    return response;
  } catch (error) {
    console.error(error);
  }
}
