import "./App.css";

import GameProvider from "./context/GameProvider";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOverPage";
// import ReviewPage from "./pages/ReviewPage";

// import NavBar from "./components/NavBar";
// import UserSession from "./components/UserSession";
import RetryPage from "./pages/RetryPage";

function App() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 h-full">
      <BrowserRouter>
        <GameProvider>
          {/* <NavBar /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/gameover" element={<GameOverPage />} />
            {/* <Route path="/review" element={<ReviewPage />} /> */}
            <Route path="/retry" element={<RetryPage />} />
          </Routes>
          {/* <UserSession /> */}
        </GameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
