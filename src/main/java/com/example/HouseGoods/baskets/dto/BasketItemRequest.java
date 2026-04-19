package com.example.HouseGoods.baskets.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasketItemRequest {
    private String sku;
    private Integer quantity;
}
