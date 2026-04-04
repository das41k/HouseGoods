package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.ProductService;
import com.example.HouseGoods.products.dto.ProductFilterRequest;
import com.example.HouseGoods.products.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@Slf4j
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/{sku}")
    public ResponseEntity<ProductResponse> getProductBySku(@PathVariable String sku) {
        log.debug("GET /api/products/sku : {}", sku);
        return ResponseEntity.ok(productService.getProductBySku(sku));
    }

    @GetMapping("/filters")
    public ResponseEntity<List<ProductResponse>> getProductsByFilters(@RequestBody ProductFilterRequest filters) {
        log.debug("GET /api/products/filters : {}", filters);
        return ResponseEntity.ok(productService.getProductsByFilters(filters));
    }

    @GetMapping("/sales")
    public ResponseEntity<List<ProductResponse>> getProductsByStocks() {
        log.debug("GET /api/products/sales");
        return ResponseEntity.ok(productService.getProductsByContainsSalePrice());
    }
}
