package io.nology.trivia.game.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "games")
public class Game {

    // properties

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    @CreationTimestamp
    private LocalDateTime datePlayed;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameAnswer> answers = new ArrayList<>();

    // constructor

    public Game() {
    }

    // getters/setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDateTime getDatePlayed() {
        return datePlayed;
    }

    public List<GameAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<GameAnswer> answers) {
        this.answers = answers;
    }
}
