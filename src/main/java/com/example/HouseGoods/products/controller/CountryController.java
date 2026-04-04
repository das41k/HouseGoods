package com.example.HouseGoods.products.controller;

import com.example.HouseGoods.products.ProductService;
import com.example.HouseGoods.products.dto.CountryResponse;
import com.example.HouseGoods.products.dto.ProductResponse;
import com.example.HouseGoods.products.entity.Country;
import com.example.HouseGoods.products.mapper.CountryMapper;
import com.example.HouseGoods.products.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
@Slf4j
public class CountryController {
    private final ProductService productService;
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    @GetMapping("/{countryName}/products")
    public ResponseEntity<List<ProductResponse>> getProductsByCountry(@PathVariable String countryName) {
        log.debug("GET /api/countries/countryName : {} + products", countryName);
        return ResponseEntity.ok(productService.getProductsByCountry(countryName));
    }

    @GetMapping
    public ResponseEntity<List<CountryResponse>> getAllCountries() {
        log.debug("GET /api/countries");
        List<Country> countries = countryRepository.findAll();
        List<CountryResponse> response = countries.stream()
                .map(countryMapper::mappingToCountryResponse)
                .toList();
        return ResponseEntity.ok(response);
    }
}
