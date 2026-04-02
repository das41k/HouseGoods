package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.ProductService;
import com.example.HouseGoods.products.dto.ProductsByCategory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
@Slf4j
@RequiredArgsConstructor
public class CategoryController {

    private final ProductService productService;

    @GetMapping("/{categoryName}")
    public ProductsByCategory getProductsByCategory(@PathVariable String categoryName) {
        log.debug("GET /api/categories/categoryName : {}", categoryName);
        return productService.getProductsByCategory(categoryName);
    }
}
