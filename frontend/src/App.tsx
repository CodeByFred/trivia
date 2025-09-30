import "./App.css";

import GameProvider from "./context/GameProvider";
import { BrowserRouter, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import GameOverPage from "./pages/GameOverPage";
import RetryPage from "./pages/RetryPage";

function App() {
  return (
    <div className="flex flex-col items-center justify-self-center justify-center text-center p-8 h-full w-full  overflow-y-auto overflow-x-hidden custom-scrollbar ">
      <div className="flex flex-col  gap-8 py-8 w-full h-fit items-center justify-around justify-self-center">
        <BrowserRouter>
          <GameProvider>
            {/* <NavBar /> */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<GamePage />} />
              <Route path="/gameover" element={<GameOverPage />} />
              <Route path="/retry" element={<RetryPage />} />
            </Routes>
            {/* <UserSession /> */}
          </GameProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
