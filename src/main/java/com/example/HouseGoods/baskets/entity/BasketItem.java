package com.example.HouseGoods.baskets.entity;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.products.Product;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "basket_items")
@Data
public class BasketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "basket_id")
    private Basket basket;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price_at_add_time")
    private Double priceAtAddTime;

    public Double getSubtotal() {
        return priceAtAddTime * quantity;
    }

}
