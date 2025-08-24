import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import ReviewPage from "./pages/ReviewPage";
import GameProvider from "./context/GameProvider";

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
          </Routes>
        </GameProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
