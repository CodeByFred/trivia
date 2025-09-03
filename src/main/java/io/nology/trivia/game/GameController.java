package io.nology.trivia.game;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import io.nology.trivia.game.dtos.GameResultDto;
import io.nology.trivia.game.entities.Game;
import jakarta.validation.Valid;

@Controller
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Add endpoints for game-related actions

    @PostMapping
    public ResponseEntity<Game> saveGame(@Valid @RequestBody GameResultDto gameDto) {
        Game savedGame = gameService.saveGame(gameDto);
        return ResponseEntity.ok(savedGame);
    }

}
