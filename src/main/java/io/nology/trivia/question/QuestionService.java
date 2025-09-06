package io.nology.trivia.question;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import io.nology.trivia.question.dtos.GameQuestionsDto;
import io.nology.trivia.question.dtos.QuestionDto;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    // service methods

    public List<Question> saveAll(GameQuestionsDto dto) {
        // convert dtos > entities
        QuestionDto[] questionDtos = dto.getQuestions();
        Question[] questions = Arrays.stream(questionDtos)
                .map(this::convertToQuestionEntity)
                .toArray(Question[]::new);

        // save all in list to db
        List<Question> questionList = new ArrayList<>(Arrays.asList(questions));
        System.out.println("Saving questions to DB: " + questionList);
        return questionRepository.saveAll(questionList);
    }

    public List<Question> findAll() {
        System.out.println("All questions in DB: " + questionRepository.findAll());
        return questionRepository.findAll();
    }

    // helper methods

    public Question convertToQuestionEntity(QuestionDto dto) {
        Question q = new Question();
        q.setType(dto.getType());
        q.setDifficulty(dto.getDifficulty());
        q.setCategory(dto.getCategory());
        q.setQuestion(dto.getQuestion());
        q.setCorrectAnswer(dto.getCorrectAnswer());
        q.setIncorrectAnswer1(dto.getIncorrectAnswers()[0]);
        q.setIncorrectAnswer2(dto.getIncorrectAnswers()[1]);
        q.setIncorrectAnswer3(dto.getIncorrectAnswers()[2]);
        return q;
    }

}
