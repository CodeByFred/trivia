package io.nology.trivia.gameAnswer;

import io.nology.trivia.game.entities.GameAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GameAnswerRepository extends JpaRepository<GameAnswer, Long> {
    List<GameAnswer> findByArchivedAndWasCorrectAndQuestionDifficulty(boolean archived, boolean failed, String difficulty);

    List<GameAnswer> findByArchivedAndWasCorrect(boolean archived, boolean wasCorrect);

    @Query("SELECT COUNT(ga) FROM GameAnswer ga " +
            "WHERE ga.wasCorrect = false AND ga.archived = false " +
            "AND ga.question.difficulty = :difficulty")
    long countByDifficultyAndWasCorrectFalseAndArchivedFalse(@Param("difficulty") String difficulty);}
