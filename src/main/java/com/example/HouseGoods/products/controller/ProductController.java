package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.ProductService;
import com.example.HouseGoods.products.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{sku}")
    public ProductResponse getProductBySku(@PathVariable String sku) {
        log.debug("GET /products/sku : {}", sku);
        return productService.getProductBySku(sku);
    }
}
