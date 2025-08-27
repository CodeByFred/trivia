# Changelog for Trivia Game Project

> Put a summary of the changes made whenever you make a big commit here if you want to keep track of the project's history.

## Week 1 - Setup + Front-end

Tickets:
Fred - Game start UI + category/difficulty selection form
Carrie - Trivia question display UI + answer submission form

Changes:

- Initial project setup
- Set up frontend with React and Vite
- Fetch trivia questions from the Open Trivia API
- Set up pages and routing for home page and trivia question page
- Set up new game button to fetch new set of questions form Open Trivia API
- Added basic trivia rendering and multiple choice answer dropdown form

## Week 2

Tickets:
Fred - UI Styling + API session tokens, backend entities/skeleton
Carrie - UI Styling + front-end game progress data storage

Changes:

- Light styling for alignment/layout
- Refactor TriviaQuestion/TriviaForm with answer selection/shuffling
- Add types for answered questions and game result DTOs
- Tailwind installed and basic config
- Add session token to question queries (OpenTriviaAPI)

PR #1: Fetching from OpenTriviaAPI (closed)

- Implement API calls to fetch trivia questions
- Handle loading and error states in the UI
- Fixed issue with expired session tokens

## Week 3

Tickets:
Fred - context/provider integration, token session fixes
Carrie - game display/flow, answer scoring/saving, game-over/ReviewPage UI

Changes:

- Implement GameContext
  - load/score/save game logic for questions & answers
  - user session management (saving tokens in context)
  - encapsulate game state/logic in context with exposed API methods
- Wire component state to context in GamePage
- Add UserSession component to display token and expiry
- Add GameOverModal to display CTA navigation buttons (Play Again, New Game, Review Answers)
- Add GameLog components to display submitted answers in ReviewPage
  - (in context atm -> fetch from backend game history later)
- Some responsiveness and UI fixes in index.css (viewport adjustments)

PR #2: Game UI/Flow
Mainly front-end features including UI game flow and styling improvements, user session management, and game state encapsulation with GameContext.

