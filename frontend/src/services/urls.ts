export const rawUrl = import.meta.env.VITE_API_URL;
export const API = rawUrl ? `https://${rawUrl}` : "http://localhost:8080";
export const GAME_ENDPOINT = `/games`;
export const GAMEANSWER_ENDPOINT = `/game-answers`;
export const QUESTION_ENDPOINT = `/questions`;
