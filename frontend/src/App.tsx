import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import GameProvider from "./context/GameProvider";
import UserSession from "./components/UserSession";
import RetryPage from "./pages/RetryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <GameProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/retry" element={<RetryPage />} />
          </Routes>
          <UserSession />
        </GameProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
