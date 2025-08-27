import type { GameData } from "../types/types";
import { API, GAME_ENDPOINT } from "./urls";

export async function submitGameData(gameData: GameData) {
  try {
    const response = await fetch(`${API}${GAME_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      console.log(response);
    }

    const result = response.text;
    return result;
  } catch (reponse) {
    console.log(reponse);
  }
}
