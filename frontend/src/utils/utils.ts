import type { Question } from "../types/types";

export function shuffleAnswers(array: string[]) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    // pick element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap with current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function orderAnswersIntoArray(q: Question) {
  return [q.correctAnswer, ...(q.incorrectAnswers ?? [])].filter(
    (a): a is string => typeof a === "string"
  );
}

export function calculatePointsFromDifficulty(actualQuestion: Question) {
  if (actualQuestion.difficulty === "easy") {
    return 10;
  } else if (actualQuestion.difficulty === "medium") {
    return 20;
  } else if (actualQuestion.difficulty === "hard") {
    return 30;
  }
  return 0;
}
