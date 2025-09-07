package io.nology.trivia.question;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import io.nology.trivia.question.dtos.QuestionDto;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<Question> findAll() {
        return questionRepository.findAll();
    }

    public Optional<Question> findById(Long id) {
        return questionRepository.findById(id);
    }

    public List<Question> saveAll(List<QuestionDto> qDtos) {
        List<Question> questions = new ArrayList<>();
        qDtos.forEach(qDto -> questions.add(mapToQuestionEntity(qDto)));
        return questionRepository.saveAll(questions);
    }

    // helper methods

    public Question mapToQuestionEntity(QuestionDto qDto) {
        Question q = new Question();
        q.setType(qDto.getType());
        q.setDifficulty(qDto.getDifficulty());
        q.setCategory(qDto.getCategory());
        q.setQuestion(qDto.getQuestion());
        q.setCorrectAnswer(qDto.getCorrectAnswer());
        q.setIncorrectAnswer1(qDto.getIncorrectAnswers().get(0));
        q.setIncorrectAnswer2(qDto.getIncorrectAnswers().get(1));
        q.setIncorrectAnswer3(qDto.getIncorrectAnswers().get(2));
        return q;
    }

}
