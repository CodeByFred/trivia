export function shuffle(array: string[]) {
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
