package com.example.HouseGoods.delivery.entity;

import com.example.HouseGoods.client.Client;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "addresses")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

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
}
