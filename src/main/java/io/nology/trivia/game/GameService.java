package io.nology.trivia.game;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import io.nology.trivia.dtos.GameResultDto;
import io.nology.trivia.game.entities.Game;

@Service
public class GameService {

    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game save(GameResultDto gameDto) {
        Game game = convertToEntity(gameDto);
        return gameRepository.save(game);
    }

    public Game convertToEntity(GameResultDto gameDto) {
        Game game = new Game();
        game.setScore(gameDto.getScore());
        // not done
        //
        return game;
    }

}
