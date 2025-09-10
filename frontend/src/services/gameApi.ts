import type { FinalGameDto } from "../types/types";
import { API, GAME_ENDPOINT } from "./urls";

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
