package io.nology.trivia.game.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import io.nology.trivia.question.Question;
import jakarta.persistence.*;

@Entity
@Table(name = "game_answers")
public class GameAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String submittedAnswer;

    private boolean wasCorrect;

    private boolean archived = false;

    @ManyToOne // Each GameAnswer belongs to one Game.
    @JoinColumn(name = "game_id")
    @JsonBackReference
    private Game game;

    @ManyToOne // Each GameAnswer links to exactly one Question.????
    @JoinColumn(name = "question_id")
    @JsonBackReference
    private Question question;

    public GameAnswer() {
    }

    public Long getId() {
        return id;
    }

    public boolean isWasCorrect() {
        return wasCorrect;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public String getSubmittedAnswer() {
        return submittedAnswer;
    }

    public void setSubmittedAnswer(String submittedAnswer) {
        this.submittedAnswer = submittedAnswer;
    }

    public boolean wasCorrect() {
        return wasCorrect;
    }

    public void setWasCorrect(boolean wasCorrect) {
        this.wasCorrect = wasCorrect;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }


}
