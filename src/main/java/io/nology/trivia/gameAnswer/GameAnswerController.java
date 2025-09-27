package io.nology.trivia.gameAnswer;

import io.nology.trivia.game.entities.GameAnswer;
import io.nology.trivia.gameAnswer.dtos.GameAnswerRequestDto;
import io.nology.trivia.gameAnswer.dtos.GameAnswerResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game-answers")
public class GameAnswerController {

    private final GameAnswerService gameAnswerService;

    public GameAnswerController(GameAnswerService gameAnswerService) {
        this.gameAnswerService = gameAnswerService;
    }

    @GetMapping
    public ResponseEntity<List<GameAnswerRequestDto>> getRequestedQuantity(@RequestParam boolean archived, @RequestParam boolean wasCorrect, @RequestParam(required = false) String difficulty, @RequestParam int quantity) {

        List<GameAnswerRequestDto> retries;

        if(difficulty == null){
             retries = gameAnswerService.getRequestedQuantity(archived, wasCorrect, quantity);
        } else {
            retries = gameAnswerService.getRequestedQuantity(archived, wasCorrect, difficulty, quantity);
        }

        return ResponseEntity.ok(retries);
    }

    @PatchMapping("/{id}")
        public ResponseEntity<GameAnswer> updateArchived(@PathVariable Long id, @Valid @RequestBody GameAnswerResponseDto data) throws Exception {
        GameAnswer reply = this.gameAnswerService.updateArchivedById(id, data);
        return ResponseEntity.ok(reply);
    }
}
