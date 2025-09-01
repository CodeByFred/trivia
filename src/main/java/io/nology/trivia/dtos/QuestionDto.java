package io.nology.trivia.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class QuestionDto {

    @NotBlank
    @NotNull
    private String type;

    @NotBlank
    @NotNull
    private String difficulty;

    @NotBlank
    @NotNull
    private String category;

    @NotBlank
    @NotNull
    private String question;

    @NotBlank
    @NotNull
    private String correctAnswer;

    @NotEmpty
    private String[] incorrectAnswers;

    public String getType() {
        return type;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getCategory() {
        return category;
    }

    public String getQuestion() {
        return question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String[] getIncorrectAnswers() {
        return incorrectAnswers;
    }

}
