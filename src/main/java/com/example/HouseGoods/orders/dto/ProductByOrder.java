package com.example.HouseGoods.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductByOrder {
    private String sku;
    private String name;
    private Double price;
    private Integer quantity;
    private String imgURl;
}
