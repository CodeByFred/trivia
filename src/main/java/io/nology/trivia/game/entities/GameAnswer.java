package io.nology.trivia.game.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "game_answers")
public class GameAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    private Long questionId;

    private String submittedAnswer;

    private boolean correct;

    public GameAnswer() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getSubmittedAnswer() {
        return submittedAnswer;
    }

    public void setSubmittedAnswer(String submittedAnswer) {
        this.submittedAnswer = submittedAnswer;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean wasCorrect) {
        this.correct = wasCorrect;
    }
}
