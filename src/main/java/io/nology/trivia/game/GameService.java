package io.nology.trivia.game;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import io.nology.trivia.game.dtos.GameAnswerDto;
import io.nology.trivia.game.dtos.GameResultDto;
import io.nology.trivia.game.entities.Game;
import io.nology.trivia.game.entities.GameAnswer;

@Service
public class GameService {

    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game saveGame(GameResultDto gameDto) {
        Game game = convertToGameEntity(gameDto);
        System.out.println("Saving game results to DB: " + game);
        return gameRepository.save(game);
    }

    // helper methods

    public Game convertToGameEntity(GameResultDto gameDto) {
        Game g = new Game();
        g.setScore(gameDto.getScore());
        GameAnswer[] answers = convertToGameAnswerEntity(gameDto.getAnswers(), g);
        g.setAnswers(answers != null ? Arrays.asList(answers) : null);
        return g;
    }

    public GameAnswer[] convertToGameAnswerEntity(GameAnswerDto[] dto, Game game) {
        return Arrays.stream(dto)
                .map(answerDto -> {
                    GameAnswer ga = new GameAnswer();
                    ga.setGame(game);
                    // todo : how to fetch questionId from DB?
                    ga.setSubmittedAnswer(answerDto.getSubmittedAnswer());
                    ga.setWasCorrect(answerDto.wasCorrect());
                    return ga;
                })
                .toArray(GameAnswer[]::new);
    }

}
