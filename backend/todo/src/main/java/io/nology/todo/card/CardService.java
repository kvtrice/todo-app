package io.nology.todo.card;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;
import io.nology.todo.common.ValidationErrors;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@Service
public class CardService {

    @Autowired
    private CardRepository repo;

    @Autowired
    private CategoryService categoryService;

    public Card createCard(@Valid CreateCardDTO cardData) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();

        Card newCard = new Card();

        newCard.setDescription(cardData.getDescription().trim());
        newCard.setStatus(cardData.getStatus());
        newCard.onCreate();

        Optional<Category> category = this.categoryService.findById(cardData.getCategoryId());

        if (category.isPresent()) {
            newCard.setCategory(category.get());
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        return this.repo.save(newCard);
    }

    public List<Card> getAllCards() {
        return this.repo.findAll();
    }

    public Optional<Card> getCardbyId(Long id) {
        return this.repo.findById(id);
    }

}
