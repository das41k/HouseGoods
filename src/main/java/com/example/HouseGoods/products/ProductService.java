package com.example.HouseGoods.products;

import com.example.HouseGoods.products.dto.ProductResponse;
import com.example.HouseGoods.products.dto.ProductsByCategory;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.exception.ProductNotFoundException;
import com.example.HouseGoods.products.repository.CategoryRepository;
import com.example.HouseGoods.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductsByCategory getProductsByCategory(String categoryName) {
        log.info("Работа ProductService: getProductsByCategory(String categoryName)");
        Category category = categoryRepository.findByTitle(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException("Категория с данным именем не была найдена!"));
        List<Product> products = productRepository.findByCategory(category);
        List<ProductResponse> productResponseList = products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
        ProductsByCategory productsByCategory = new ProductsByCategory();
        productsByCategory.setCategoryName(categoryName);
        productsByCategory.setProducts(productResponseList);
        log.info("Завершение ProductService: getProductsByCategory(String categoryName)");
        return productsByCategory;
    }

    public ProductResponse getProductBySku(String sku) {
        log.info("Работа ProductService: getProductBySku(String sku)");
        Product product = productRepository.findBySku(sku)
                        .orElseThrow(() -> new ProductNotFoundException("Данный товар не был найден!"));
        log.info("Завершение ProductService: getProductBySku(String sku)");
        return productMapper.mappingByProductResponse(product);
    }
}
