package com.example.HouseGoods.products.dto;

import com.example.HouseGoods.products.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductsByCategory {
    private String categoryName;
    private List<Product> products;
}
