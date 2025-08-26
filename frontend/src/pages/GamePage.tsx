import TriviaQuestion from "../components/TriviaQuestion";
import ScoreBoard from "../components/ScoreBoard";
import GameOverModal from "../components/GameOverModal";
import { useGameContext } from "../context/useGameContext";

const Game = () => {
  // const [totalQuestions, setTotalQuestions] = useState(questions.length);
  // const [userScore, setUserScore] = useState(0);
  // const [index, setIndex] = useState(0);
  // const [gameOver, setGameOver] = useState(false);

  // useEffect(() => {
  //   if (index > totalQuestions) {
  //     setGameOver(true);
  //   }
  // }, [index, totalQuestions]);

  // const resetGame = () => {
  //   setUserScore(0);
  //   setIndex(0);
  //   setGameOver(false);
  // };

  // if (loading) return <p>Loading questions...</p>;
  // if (error) return <p>{error}</p>;

  const { questions, currentIndex, gameState, resetGame, loadNextQuestion } =
    useGameContext();

  const currentQuestion = questions[currentIndex];

  return (
    <>
      {gameState !== "finished" && <ScoreBoard />}

      {questions.length == 0 && gameState !== "finished" && (
        <p>
          No questions loaded yet. <br />
          Please start a new game on Home Page.
        </p>
      )}

      {gameState !== "finished" && (
        <TriviaQuestion
          question={currentQuestion}
          index={currentIndex}
          totalQuestions={questions.length}
          onNext={loadNextQuestion}
        />
      )}
      {gameState === "finished" && questions.length > 0 && (
        <GameOverModal resetGame={resetGame} />
      )}
    </>
  );
};

export default Game;
