package io.nology.todo.category;

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
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CreateCategoryDTO categoryData)
            throws ServiceValidationException {
        Category newCategory = this.categoryService.createCategory(categoryData);
        return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = this.categoryService.getAllCategories();
        return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) throws NotFoundException {
        Optional<Category> category = this.categoryService.findById(id);
        Category foundCategory = category.orElseThrow(() -> new NotFoundException("Category not found"));
        return new ResponseEntity<Category>(foundCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategoryById(@PathVariable Long id) throws NotFoundException {
        Optional<Category> category = this.categoryService.deleteById(id);
        Category deletedCategory = category
                .orElseThrow(() -> new NotFoundException("Could not find category with id " + id));
        return new ResponseEntity<Category>(deletedCategory, HttpStatus.OK);
    }
}
