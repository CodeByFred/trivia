package io.nology.trivia.game;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.nology.trivia.game.dtos.GameAnswerDto;
import io.nology.trivia.game.dtos.GameResultDto;
import io.nology.trivia.game.entities.Game;
import io.nology.trivia.game.entities.GameAnswer;
import io.nology.trivia.question.Question;
import io.nology.trivia.question.QuestionService;

@Service
public class GameService {

    private GameRepository gameRepository;
    private QuestionService questionService;

    public GameService(GameRepository gameRepository, QuestionService questionService) {
        this.gameRepository = gameRepository;
        this.questionService = questionService;
    }

    @Transactional // prevent partially saved data
    public Game saveGame(GameResultDto gameResultDto) {

        // 1. Build & save Questions via questionService:
        List<Question> savedQuestions = questionService.saveAll(gameResultDto.getSavedQuestions());
        // saving generates question.id

        // 2. Build new Game:
        Game game = new Game();
        game.setScore(gameResultDto.getSavedScore());
        // saving generates game.id + game.datePlayed

        // 3. Build & save Game Answers, linking to Game & Questions:
        for (GameAnswerDto gaDto : gameResultDto.getSavedAnswers()) {
            GameAnswer answer = new GameAnswer();
            answer.setSubmittedAnswer(gaDto.getSubmittedAnswer());
            answer.setWasCorrect(gaDto.getWasCorrect());
            answer.setQuestion(savedQuestions.get(gaDto.getQuestionIndex())); // IndexOutOfBoundsError ?
            answer.setGame(game); // link to parent
            game.getAnswers().add(answer); // JPA cascades will save this
        }

        // 4. Save game → answers are auto-saved
        return gameRepository.save(game);
    }

    public List<Game> findAll() {
        return gameRepository.findAll();
    }

}
