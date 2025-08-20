export type TriviaAPIResponse = {
  response_code: number;
  results: TriviaAPIResponseQuestion[];
};

export type TriviaAPIResponseQuestion = {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type Question = {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export type AnsweredQuestion = {
  question: Question;
  userAnswer: string | null;
  wasCorrect: boolean;
};

export type GameResultDto = {
  score: number;
  datePlayed: string; //iso
  submittedAnswers: AnsweredQuestion[];
};

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export type TriviaCategory = {
  id: number;
  name: string;
};

export const TRIVIA_CATEGORIES: TriviaCategory[] = [
  { id: 27, name: "Animals" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
  { id: 10, name: "Entertainment: Books" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 11, name: "Entertainment: Film" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 22, name: "Geography" },
  { id: 9, name: "General Knowledge" },
  { id: 23, name: "History" },
  { id: 20, name: "Mythology" },
  { id: 24, name: "Politics" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 30, name: "Science: Gadgets" },
  { id: 19, name: "Science: Mathematics" },
  { id: 21, name: "Sports" },
  { id: 28, name: "Vehicles" },
];
