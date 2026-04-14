package com.example.HouseGoods.orders.entity;

import com.example.HouseGoods.client.Client;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "deliveries")
@Data
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long deliveryId;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "house", nullable = false)
    private String house;

    @Column(name = "apartment", nullable = false)
    private String apartment;

    @Column(name = "entrance")
    private String entrance;       // Подъезд

    @Column(name = "floor")
    private Integer floor;         // Этаж

    @Column(name = "intercom")
    private String intercom;       // Домофон

    @Column(name = "delivery_time_from")
    private LocalTime deliveryTimeFrom;

    @Column(name = "delivery_time_to")
    private LocalTime deliveryTimeTo;

    @Column(name = "courier_comment")
    private String courierComment;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;
}
