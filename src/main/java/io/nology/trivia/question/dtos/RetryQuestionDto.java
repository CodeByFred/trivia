package io.nology.trivia.question.dtos;

import java.util.List;

public record RetryQuestionDto(
        String type,
        String difficulty,
        String category,
        String question,
        String correctAnswer,
        List<String> incorrectAnswers
) {}