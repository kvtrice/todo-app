package io.nology.todo.category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.todo.common.exceptions.ServiceValidationException;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO categoryData) throws ServiceValidationException {
        Category newCategory = this.categoryService.createCategory(categoryData);
        return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
    }

}
