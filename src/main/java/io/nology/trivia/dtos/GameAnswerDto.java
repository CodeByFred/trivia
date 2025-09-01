package io.nology.trivia.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GameAnswerDto {

    @NotNull
    private int questionIndex;

    @NotBlank
    // Can be null (timer ran out)
    private String submitted;

    @NotNull
    private boolean wasCorrect;

    public int getQuestionIndex() {
        return questionIndex;
    }

    public String getSubmitted() {
        return submitted;
    }

    public boolean wasCorrect() {
        return wasCorrect;
    }
}
