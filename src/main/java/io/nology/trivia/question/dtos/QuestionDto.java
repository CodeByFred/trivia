package io.nology.trivia.question.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class QuestionDto {

    @NotBlank
    @NotNull
    private String type;

    @NotBlank
    @NotNull
    @Pattern(regexp = "any|easy|medium|hard", message = "Difficulty must be 'any','easy', 'medium', or 'hard'")
    private String difficulty;

    @NotBlank
    @NotNull
    // enum for trivia categories needed?
    private String category;

    @NotBlank
    @NotNull
    private String question;

    @NotBlank
    @NotNull
    private String correctAnswer;

    @NotEmpty
    @NotNull
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
