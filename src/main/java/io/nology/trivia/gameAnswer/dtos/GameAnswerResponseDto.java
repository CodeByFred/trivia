package io.nology.trivia.gameAnswer.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jdk.jfr.BooleanFlag;

public class GameAnswerResponseDto {

    @NotNull
    @Min(1)
    Long id;

    @BooleanFlag
    boolean archived;
}
