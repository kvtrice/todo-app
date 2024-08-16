package io.nology.todo.card;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateCardDTO {
    @NotBlank
    @Length(min = 3)
    private String description;

    @NotNull
    private CardStatus status;

    @NotNull
    @Min(1)
    private Long categoryId;

    public String getDescription() {
        return description;
    }

    public CardStatus getStatus() {
        return status;
    }

    public Long getCategoryId() {
        return categoryId;
    }

}
