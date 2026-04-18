package com.example.HouseGoods.baskets.mapper;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.baskets.dto.BasketItemResponse;
import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.entity.BasketItem;
import com.example.HouseGoods.products.Product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BasketMapper {
    public BasketResponse toBasketResponse(Basket basket) {
        List<BasketItemResponse> items = basket.getBasketItems()
                .stream()
                .map(this::toBasketItemResponse)
                .toList();
        return BasketResponse.builder()
                .createdAt(basket.getCreatedAt())
                .updatedAt(basket.getUpdatedAt())
                .items(items)
                .totalPrice(items.stream()
                        .mapToDouble(BasketItemResponse::getPrice)
                        .sum()
                )
                .build();
    }

    public BasketItemResponse toBasketItemResponse(BasketItem item) {
        Product product = item.getProduct();
        return BasketItemResponse.builder()
                .sku(product.getSku())
                .name(product.getName())
                .imgURl(product.getImageURl())
                .quantity(item.getQuantity())
                .category(product.getCategory().getTitle())
                .brand(product.getBrand().getName())
                .price(getPriceByBasketItem(product, item.getQuantity()))
                .build();
    }

    public Double getPriceByBasketItem(Product product, Integer quantity) {
        return product.getSalePrice() != null ? product.getSalePrice() * quantity :
                product.getBasePrice() * quantity;
    }
}
