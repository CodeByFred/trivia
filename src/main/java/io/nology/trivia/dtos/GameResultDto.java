package io.nology.trivia.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class GameResultDto {

    @NotNull
    private Integer score;

    @NotEmpty
    private QuestionDto[] questions;

    @NotEmpty
    private GameAnswerDto[] answers;

    public int getScore() {
        return score;
    }

    public QuestionDto[] getQuestions() {
        return questions;
    }

    public GameAnswerDto[] getAnswers() {
        return answers;
    }

}
