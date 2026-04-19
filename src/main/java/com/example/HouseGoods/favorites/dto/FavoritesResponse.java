package com.example.HouseGoods.favorites.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoritesResponse {
    private String sku;
    private String name;
    private String description;
    private Double basePrice;
    private Double salePrice;
    private String imgURl;
    private String category;
    private String brand;
    private LocalDateTime dateAdded;
}
