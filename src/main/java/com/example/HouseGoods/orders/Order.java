package com.example.HouseGoods.orders;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.delivery.Delivery;
import com.example.HouseGoods.orders.entity.OrderItem;
import com.example.HouseGoods.orders.entity.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItems;

    @Column(name = "total_amount")
    private Double totalAmount;

    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethod paymentMethod;

    @Column(name = "delivery_price")
    private Double deliveryPrice;

    @ManyToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

}
