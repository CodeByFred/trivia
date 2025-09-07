package io.nology.trivia.game.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class GameAnswerDto {

    @NotNull
    private int questionIndex;

    @NotBlank
    // Can be null (timer ran out)
    private String submittedAnswer;

    @NotNull
    private boolean wasCorrect;

    public int getQuestionIndex() {
        return questionIndex;
    }

    public String getSubmittedAnswer() {
        return submittedAnswer;
    }

    public boolean getWasCorrect() {
        return wasCorrect;
    }
}
