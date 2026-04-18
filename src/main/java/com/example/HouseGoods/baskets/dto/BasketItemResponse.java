package com.example.HouseGoods.baskets.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BasketItemResponse {
    private Integer quantity;
    private Double price;
    private String sku;
    private String name;
    private String category;
    private String brand;
    private String imgURl;
}
