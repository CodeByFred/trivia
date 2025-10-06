package io.nology.trivia.gameAnswer.dtos;

import io.nology.trivia.question.dtos.RetryQuestionDto;

public record GameAnswerRequestDto(Long id, boolean wasCorrect, boolean archived, RetryQuestionDto question) {

}
