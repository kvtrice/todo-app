package io.nology.todo.category;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.nology.todo.common.ValidationErrors;
import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repo;

    public Optional<Category> findById(Long categoryId) {
        return this.repo.findById(categoryId);
    }

    public List<Category> getAllCategories() {
        return this.repo.findAll();
    }

    public Category createCategory(@Valid CreateCategoryDTO categoryData) throws ServiceValidationException {
        ValidationErrors errors = new ValidationErrors();

        String trimmedName = categoryData.getName().trim().toLowerCase();
        trimmedName = trimmedName.substring(0, 1).toUpperCase() + trimmedName.substring(1, trimmedName.length());

        if (repo.existsByName(trimmedName)) {
            errors.addError("name", "The category '" + trimmedName + "' already exists");
        }

        Category newCategory = new Category();

        if (errors.hasErrors()) {
            throw new ServiceValidationException(errors);
        }

        newCategory.setName(trimmedName);
        return this.repo.save(newCategory);
    }

    public Optional<Category> deleteById(Long id) {
        Optional<Category> category = this.findById(id);
        if (category.isEmpty()) {
            return category;
        }

        // Have to initialise otherwise I hit a lazy loading error when attempting to
        // return the category
        category.get().getCards().size();
        this.repo.deleteById(id);
        return category;
    }
}
