package io.nology.trivia.gameAnswer;

import io.nology.trivia.game.entities.GameAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameAnswerRepository extends JpaRepository<GameAnswer, Long> {
    List<GameAnswer> findByArchivedAndWasCorrectAndQuestionDifficulty(boolean archived, boolean failed, String difficulty);

    List<GameAnswer> findByArchivedAndWasCorrect(boolean archived, boolean wasCorrect);
}
