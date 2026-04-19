package com.example.HouseGoods.favorites.mapper;

import com.example.HouseGoods.favorites.Favorite;
import com.example.HouseGoods.favorites.dto.FavoritesResponse;
import com.example.HouseGoods.products.Product;
import org.springframework.stereotype.Component;

@Component
public class FavoritesMapper {
    public FavoritesResponse toFavoritesResponse(Favorite favorites) {
        Product product = favorites.getProduct();
        return FavoritesResponse.builder()
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .salePrice(product.getSalePrice())
                .imgURl(product.getImageURl())
                .category(product.getCategory().getTitle())
                .brand(product.getBrand().getName())
                .dateAdded(favorites.getDateAdded())
                .build();
    }
}
