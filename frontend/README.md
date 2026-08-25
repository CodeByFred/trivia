# Trivia Frontend

## Overview

React + TypeScript client for the Trivia app.

- Fetches quiz questions from OpenTDB.
- Sends completed game and retry updates to the backend API.
- Depends on the backend running at `http://localhost:8080`.

Repository entrypoint: [`/home/runner/work/trivia/trivia/README.md`](../README.md)

## Setup

Requirements:

- Node.js
- npm

From `/home/runner/work/trivia/trivia/frontend`:

```bash
npm install
```

## Run

From `/home/runner/work/trivia/trivia/frontend`:

```bash
npm run dev
```

Default dev URL: `http://localhost:5173`

## Build/Test/Lint

From `/home/runner/work/trivia/trivia/frontend`:

```bash
npm run build
npm run lint
```

There are currently no frontend test scripts defined in `package.json`.

## API/Architecture

- Backend base URL is configured in `/home/runner/work/trivia/trivia/frontend/src/services/urls.ts`:
  - `API = "http://localhost:8080"`
- Quiz question source:
  - OpenTDB (`https://opentdb.com/api.php`)
- Backend endpoints used by the frontend include:
  - `POST /games`
  - `GET /game-answers`
  - `PATCH /game-answers/{id}`
  - `GET /game-answers/retry-counts`

## Troubleshooting

- **`Failed to fetch` errors**: verify the backend is running on `http://localhost:8080`.
- **CORS errors**: verify frontend runs on `http://localhost:5173` to match backend CORS config.
- **No retry questions returned**: ensure there are non-archived incorrect answers saved in the backend DB.

## References

- [nology project brief](https://github.com/nology-tech/aus-post-course-guide/tree/main/projects/trivia-api)
- [Group Trello Board](https://trello.com/b/14XGoYKh/trivia-full-stack-project-fred-carrie)
- [Figma Board](https://www.figma.com/board/p0I0y8Sr4brnA6b1FiPCDy/trivia?node-id=0-1&t=a3gPBNrj4if6PYC4-1)
- [Figma prototype](https://www.figma.com/proto/zPos2p8aVm7ntacLZgqYGO/trivia-mockups?page-id=0%3A1&node-id=55-1145&viewport=-762%2C-28%2C0.13&t=5Jyom8thV8RuHazm-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=55%3A1145&show-proto-sidebar=1)
