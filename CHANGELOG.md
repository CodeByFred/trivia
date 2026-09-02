# Changelog for Trivia Game Project

> Put a summary of the changes made whenever you make a big commit here if you want to keep track of the project's history.

---

## 02/09/2026

Changed backend to PostgreSQL:

- Replaced MySQL driver in `pom.xml:52`
- Updated datasource, dialect, and container binding in `application.properties:3`
- Updated SQL helper for PostgreSQL in `trivia_db_queries.sql:3`

Deployment env vars:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST:5432/DB_NAME
SPRING_DATASOURCE_USERNAME=USER
SPRING_DATASOURCE_PASSWORD=PASSWORD
```

- `ddl-auto=update` creates/updates tables. It does not migrate existing MySQL data.

Validation: ./mvnw -q -DskipTests package passed. Full tests require running PostgreSQL.

---

2025

## Week 4/5

Tickets:
Fred - Backend database/API integration, retry game and timer logic
Carrie - Frontend retry mode, points system, UI polish/CSS + design system/prototyping

Changes:

- ReviewPage is deleted (now Retry Page)
- Improved game flow and fixed timer bug with race conditions in GamePage
- Database configuration for gameAnswers and security updates

New Game mechanics

- Implemented retry mode for incorrect questions, with Retry Page
- Added points system based on difficulty (easy=10, med=20, hard=30)
- Implemented feedback system for answer submission in game flow
  - tick or cross icon pops up on screen for 1.5 seconds for right vs wrong answers (plans to implement ding/buzzer sounds later)

UX/UI

- Submit button disabled before selection
- UserSession and NavBar hidden (not needed for production, just dev/testing)
- Created interactive prototype in Figma for general user feedback on visuals/readability
- Revamped UI design system w. brand colors and typography
- Improved responsive layout for mobile screens

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
