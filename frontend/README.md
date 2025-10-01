# Trivia UI

## Introduction

**Task:** Create an app that will allow users to play trivia and display a score at the end of each game.

**Techstack:** React + Typescript.

**API calls:**

- Questions will be fetched from [Open Trivia Database API](https://opentdb.com/).
- User progress will be tracked using the [Trivia Quiz Progress API](https://github.com/nology-tech/aus-post-course-guide/tree/main/projects/trivia-api).

## Links

- [nology project brief](https://github.com/nology-tech/aus-post-course-guide/tree/main/projects/trivia-api "‌")
- [Group Trello Board](https://trello.com/b/14XGoYKh/trivia-full-stack-project-fred-carrie)
- [Figma Board](https://www.figma.com/board/p0I0y8Sr4brnA6b1FiPCDy/trivia?node-id=0-1&t=a3gPBNrj4if6PYC4-1)

## MVP

- [x] Create an interface that allows a user to choose the level of difficulty and start a new game
- [x] When the game starts, display a question card with 4 possible answers
- [x] ~~If the user answers the question correctly,~~ Show a next question when user submits answer
- [x] ~~If the answer is incorrect, end the game~~ If last question is answered, end the game
- [x]~~ Add a "Review Answers" button at the end of the game that shows the user all the questions, their answers, and the correct answers~~ only fetched questions with wasCorrect=false from backend database instead
- [x] Display the score ~~(number of questions answered correctly)~~ (points system bsed on difficulty eg. easy=10, med=20, hard=30) at the end of each game
- [x] Add a ~~"Play Again"~~ "Retry Mode" button under the score, that lets you reattempt the game's incorrect questions

## Bonus

- [x] Allow the user to select a category of questions
- [x] Add a time countdown to each question; if a question is not answered before time is up, ~~end the game~~ mark submitted answer as null and show the next question

## Figma Prototype

[Link](https://www.figma.com/proto/zPos2p8aVm7ntacLZgqYGO/trivia-mockups?page-id=0%3A1&node-id=55-1145&viewport=-762%2C-28%2C0.13&t=5Jyom8thV8RuHazm-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=55%3A1145&show-proto-sidebar=1)

```html
<iframe
  style="border: 1px solid rgba(0, 0, 0, 0.1);"
  width="800"
  height="450"
  src="https://embed.figma.com/proto/zPos2p8aVm7ntacLZgqYGO/trivia-mockups?page-id=0%3A1&node-id=55-1145&viewport=-762%2C-28%2C0.13&scaling=scale-down&content-scaling=fixed&starting-point-node-id=55%3A1145&show-proto-sidebar=1&embed-host=share"
  allowfullscreen
></iframe>
```
