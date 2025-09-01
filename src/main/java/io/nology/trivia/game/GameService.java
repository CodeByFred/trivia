package io.nology.trivia.game;

import org.springframework.stereotype.Service;

import io.nology.trivia.game.entities.Game;

@Service
public class GameService {

    private GameRepository gameRepository;

    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

}
