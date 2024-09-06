package io.nology.todo.category;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class CategoryEndToEndTest {
    @LocalServerPort
    private int port;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
        categoryRepository.deleteAll();

        Category category1 = new Category();
        category1.setName("Coding");
        categoryRepository.save(category1);

        Category category2 = new Category();
        category2.setName("Pets");
        categoryRepository.save(category2);
    }

    @Test
    public void getAllCategories() {
        given()
                .when()
                .get("/categories")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("$", hasSize(2))
                .body("name", hasItems("Coding", "Pets"))
                .body(matchesJsonSchemaInClasspath("io/nology/todo/category/schemas/categories-schema.json"));
    }

    @Test
    public void createCategory_success() {
        CreateCategoryDTO data = new CreateCategoryDTO();
        data.setName("New category");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("name", equalTo("New category"))
                .body("id", notNullValue())
                .body(matchesJsonSchemaInClasspath("io/nology/todo/category/schemas/category-schema.json"));
    }

    @Test
    public void createCategory_existingCategory_failure() {
        CreateCategoryDTO data = new CreateCategoryDTO();
        data.setName("Pets");

        given()
                .contentType(ContentType.JSON)
                .body(data)
                .when()
                .post("/categories")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .body("errors.name", hasItem("The category 'Pets' already exists"));
    }
}
