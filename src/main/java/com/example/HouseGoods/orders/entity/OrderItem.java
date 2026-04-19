package com.example.HouseGoods.orders.entity;

import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.products.Product;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "orders_item")
@Data
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price_at_time")
    private Double priceAtTime;
}
