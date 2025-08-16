import { useNavigate } from "react-router-dom";

interface HomePageProps {
  loadQuestions: () => {};
}

const HomePage = ({ loadQuestions }: HomePageProps) => {
  const navigate = useNavigate();

  const newGame = () => {
    loadQuestions();
    navigate("/game");
  };

  return (
    <>
      <div>
        <h1>Welcome to the Trivia Game</h1>
        <p>Test your knowledge with our trivia questions!</p>
        {/* Game difficulty + category selection goes here */}
        <button onClick={newGame}>New Game</button>
      </div>
    </>
  );
};

export default HomePage;
