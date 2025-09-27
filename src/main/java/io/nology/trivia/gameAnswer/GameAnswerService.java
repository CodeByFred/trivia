package io.nology.trivia.gameAnswer;

import io.nology.trivia.game.entities.GameAnswer;
import io.nology.trivia.gameAnswer.dtos.GameAnswerRequestDto;
import io.nology.trivia.gameAnswer.dtos.GameAnswerResponseDto;
import io.nology.trivia.question.Question;
import io.nology.trivia.question.QuestionRepository;
import io.nology.trivia.question.dtos.RetryQuestionDto;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameAnswerService {

    private final GameAnswerRepository gameAnswerRepository;

    public GameAnswerService(GameAnswerRepository gameAnswerRepository) {
        this.gameAnswerRepository = gameAnswerRepository;
    }

    // Overloaded methods for "any" difficulty and a "easy | medium | hard" difficulty

    public List<GameAnswerRequestDto> getRequestedQuantity(boolean archived, boolean wasCorrect, int quantity) {

        // Requesting the answers that match criteria and using the correct function name so JPA can parse
        List<GameAnswer> filteredAnswers = gameAnswerRepository.findByArchivedAndWasCorrect(archived, wasCorrect);


        // Method on collections shuffle missed questions so they are not sequential
        Collections.shuffle(filteredAnswers);

        // Return only the quantity of questions requested

        return filteredAnswers.stream()
                .limit(quantity)
                .map(answer -> {
                    Question q = answer.getQuestion();

                    RetryQuestionDto questionDto = new RetryQuestionDto(
                            q.getType(),
                            q.getDifficulty(),
                            q.getCategory(),
                            q.getQuestion(),
                            q.getCorrectAnswer(),
                            List.of(
                                    q.getIncorrectAnswer1(),
                                    q.getIncorrectAnswer2(),
                                    q.getIncorrectAnswer3()
                            )
                    );

                    return new GameAnswerRequestDto(
                            answer.getId(),
                            answer.wasCorrect(),
                            answer.isArchived(),
                            questionDto
                    );
                })
                .collect(Collectors.toList());    }

    public List<GameAnswerRequestDto> getRequestedQuantity(boolean archived, boolean wasCorrect, String difficulty, int quantity) {

        // Requesting the answers that match criteria and using the correct function name so JPA can parse
        List<GameAnswer> filteredAnswers = gameAnswerRepository.findByArchivedAndWasCorrectAndQuestionDifficulty(archived, wasCorrect, difficulty);


        // Method on collections shuffle missed questions so they are not sequential
        Collections.shuffle(filteredAnswers);

        // Return only the quantity of questions requested

        return filteredAnswers.stream()
                .limit(quantity)
                .map(answer -> {
                    Question q = answer.getQuestion();

                    RetryQuestionDto questionDto = new RetryQuestionDto(
                            q.getType(),
                            q.getDifficulty(),
                            q.getCategory(),
                            q.getQuestion(),
                            q.getCorrectAnswer(),
                            List.of(
                                    q.getIncorrectAnswer1(),
                                    q.getIncorrectAnswer2(),
                                    q.getIncorrectAnswer3()
                            )
                    );

                    return new GameAnswerRequestDto(
                            answer.getId(),
                            answer.wasCorrect(),
                            answer.isArchived(),
                            questionDto
                    );
                })
                .collect(Collectors.toList());    }

    public GameAnswer updateArchivedById(Long id, @Valid GameAnswerResponseDto data) throws Exception {

        Optional<GameAnswer> optionalGameAnswer = gameAnswerRepository.findById(id);

        if(optionalGameAnswer.isEmpty()) {
            throw new Exception();
        }

        GameAnswer gameAnswer = optionalGameAnswer.get();

        if(gameAnswer.isArchived()) {
            gameAnswer.setArchived(true);
        }
        gameAnswerRepository.save(gameAnswer);
        return gameAnswer;
    }
}
