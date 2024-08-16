package io.nology.todo.card;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.nology.todo.category.Category;
import io.nology.todo.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cards")
public class Card extends BaseEntity {

    public Card() {
        this.isArchived = false;
    }

    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("cards")
    private Category category;

    @Column
    private boolean isArchived;

    @Column
    private CardStatus status;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isArchived() {
        return isArchived;
    }

    public void setArchived(boolean isArchived) {
        this.isArchived = isArchived;
    }

    public CardStatus getStatus() {
        return status;
    }

    public void setStatus(CardStatus status) {
        this.status = status;
    }
}
