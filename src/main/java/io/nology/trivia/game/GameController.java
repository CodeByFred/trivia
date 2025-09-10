package io.nology.trivia.game;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
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

    @PostMapping
    public ResponseEntity<Game> saveGame(@Valid @RequestBody GameResultDto dto) {
        Game savedGame = gameService.saveGame(dto);
        return new ResponseEntity<>(savedGame, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Game>> getAll() {
        List<Game> games = gameService.findAll();
        return ResponseEntity.ok(games);
    }

}
