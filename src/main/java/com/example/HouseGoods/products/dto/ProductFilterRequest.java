package com.example.HouseGoods.products.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFilterRequest {
    private Double maxPrice;
    private String brand;
    private String category;

    private Boolean isSale;
    private Map<String, String> attributes;
}
