package io.nology.trivia.game;

import io.nology.trivia.game.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository <Game,Long> {
}
