package io.nology.trivia.question;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.trivia.question.dtos.GameQuestionsDto;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<List<Question>> saveQuestions(@Valid @RequestBody GameQuestionsDto dto) {
        List<Question> newQuestions = questionService.saveAll(dto);
        return ResponseEntity.ok(newQuestions);
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.findAll();
        return ResponseEntity.ok(questions);
    }

}
