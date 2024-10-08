package io.nology.todo.card;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo.common.exceptions.NotFoundException;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping
    public ResponseEntity<Card> createCard(@Valid @RequestBody CreateCardDTO cardData)
            throws ServiceValidationException {
        Card createdCard = this.cardService.createCard(cardData);
        return new ResponseEntity<Card>(createdCard, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Card>> getAllCards(@RequestParam(value = "category", required = false) String category) {
        List<Card> cards;

        if (category != null && !category.isEmpty()) {
            cards = this.cardService.getCardsByCategory(category);
        } else {
            cards = this.cardService.getAllCards();
        }

        return new ResponseEntity<List<Card>>(cards, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id) throws NotFoundException {
        Optional<Card> result = this.cardService.getCardById(id);
        Card foundCard = result.orElseThrow(() -> new NotFoundException("Card not found"));
        return new ResponseEntity<Card>(foundCard, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Card> updateCardById(@PathVariable Long id, @Valid @RequestBody UpdateCardDTO cardData)
            throws Exception {
        Optional<Card> result = this.cardService.updateCardById(id, cardData);
        Card foundCard = result.orElseThrow(() -> new NotFoundException("Could not find card with id " + id));
        return new ResponseEntity<Card>(foundCard, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Card> deleteCardById(@PathVariable Long id) throws NotFoundException {
        Optional<Card> result = this.cardService.deleteCardById(id);
        Card deletedCard = result.orElseThrow(() -> new NotFoundException("Could not find card with id " + id));
        return new ResponseEntity<Card>(deletedCard, HttpStatus.OK);
    }
}
