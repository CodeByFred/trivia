package io.nology.trivia.game.dtos;

import java.util.List;

import io.nology.trivia.question.dtos.QuestionDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class GameResultDto {

    @NotNull
    private Integer savedScore;

    @NotEmpty
    private List<GameAnswerDto> savedAnswers;

    @NotEmpty
    private List<QuestionDto> savedQuestions;

    public Integer getSavedScore() {
        return savedScore;
    }

    public List<GameAnswerDto> getSavedAnswers() {
        return savedAnswers;
    }

    public List<QuestionDto> getSavedQuestions() {
        return savedQuestions;
    }

}
