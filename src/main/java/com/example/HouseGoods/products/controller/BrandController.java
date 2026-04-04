package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.ProductService;
import com.example.HouseGoods.products.dto.ProductResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@Slf4j
public class BrandController {

    private final ProductService productService;

    @GetMapping("/{brandName}/products")
    public ResponseEntity<List<ProductResponse>> getProductsByBrand(@PathVariable String brandName) {
        log.debug("GET /api/brands/brandName : {} + products", brandName);
        return ResponseEntity.ok(productService.getProductsByBrand(brandName));
    }
}
