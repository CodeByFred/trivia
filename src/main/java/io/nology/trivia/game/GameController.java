package io.nology.trivia.game;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import io.nology.trivia.dtos.GameResultDto;
import io.nology.trivia.game.entities.Game;

@Controller
@RequestMapping("/game")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Add endpoints for game-related actions

    @PostMapping
    public ResponseEntity<Game> saveGame(@RequestBody GameResultDto gameDto) {
        Game newGame = gameService.save(gameDto);
        return ResponseEntity.ok(newGame);
    }

}
