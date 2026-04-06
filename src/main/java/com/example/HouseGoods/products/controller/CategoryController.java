package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.dto.CategoryResponse;
import com.example.HouseGoods.products.service.CategoryService;
import com.example.HouseGoods.products.service.ProductService;
import com.example.HouseGoods.products.dto.ProductsByCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Slf4j
@RequiredArgsConstructor
public class CategoryController {

    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping("/{categoryName}/products")
    public ResponseEntity<ProductsByCategory> getProductsByCategory(@PathVariable String categoryName) {
        log.debug("GET /api/categories/categoryName : {} + /products", categoryName);
        return ResponseEntity.ok(productService.getProductsByCategory(categoryName));
    }

    @GetMapping("/parents")
    public ResponseEntity<List<CategoryResponse>> getParentCategories() {
        log.debug("GET /api/categories/parents");
        return ResponseEntity.ok(categoryService.getParentCategories());
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        log.debug("GET /api/categories");
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("{id}/children")
    public ResponseEntity<List<CategoryResponse>> getChildrenCategories(@PathVariable Long id) {
        log.debug("GET /api/categories/id: {} + /children", id);
        return ResponseEntity.ok(categoryService.getChildrenCategories(id));
    }
}
