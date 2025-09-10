package io.nology.trivia.question;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.trivia.question.dtos.QuestionDto;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<List<Question>> saveQuestion(@Valid @RequestBody List<QuestionDto> dto) {
        List<Question> newQuestions = questionService.saveAll(dto);
        return new ResponseEntity<>(newQuestions, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAll() {
        List<Question> questions = questionService.findAll();
        return ResponseEntity.ok(questions);
    }

}
