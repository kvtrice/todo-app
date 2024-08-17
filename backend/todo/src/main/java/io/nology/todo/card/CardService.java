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

    public Optional<Card> updateCardById(Long id, @Valid UpdateCardDTO cardData) throws Exception {
        ValidationErrors errors = new ValidationErrors();

        Optional<Card> card = this.getCardbyId(id);
        if (card.isEmpty()) {
            return card;
        }

        Card foundCard = card.get();

        if (cardData.getDescription() != null) {
            foundCard.setDescription(cardData.getDescription().trim());
        }

        if (cardData.getStatus() != null) {
            foundCard.setStatus(cardData.getStatus());
        }

        if (cardData.getCategoryId() != null) {
            Optional<Category> category = this.categoryService.findById(cardData.getCategoryId());
            if (category.isEmpty()) {
                errors.addError("category", "Category with id " + cardData.getCategoryId() + " does not exist");
            } else {
                foundCard.setCategory(category.get());
            }
        }

        if (cardData.isArchived()) {
            foundCard.setArchived(cardData.isArchived());
        }

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        foundCard.onUpdate();
        Card updatedCard = this.repo.save(foundCard);
        return Optional.of(updatedCard);
    }

}
