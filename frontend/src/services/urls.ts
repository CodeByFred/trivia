export const rawUrl = import.meta.env.VITE_API_URL;
export const API_URL = rawUrl ? `https://${rawUrl}` : "http://localhost:8080";
export const GAME_ENDPOINT = `${API_URL}/games`;
export const GAMEANSWER_ENDPOINT = `${API_URL}/game-answers`;
export const QUESTION_ENDPOINT = `${API_URL}/questions`;
