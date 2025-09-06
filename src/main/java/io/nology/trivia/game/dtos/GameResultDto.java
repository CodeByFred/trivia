package io.nology.trivia.game.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class GameResultDto {

    @NotNull
    private Integer score;

    @NotEmpty
    private GameAnswerDto[] answers;

    public int getScore() {
        return score;
    }

    public GameAnswerDto[] getAnswers() {
        return answers;
    }

}
