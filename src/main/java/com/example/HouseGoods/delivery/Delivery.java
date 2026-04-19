package com.example.HouseGoods.delivery;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.delivery.entity.Address;
import com.example.HouseGoods.delivery.entity.DeliveryStatus;
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
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "delivery_time_from")
    private LocalTime deliveryTimeFrom;

    @Column(name = "delivery_time_to")
    private LocalTime deliveryTimeTo;

    @Column(name = "courier_comment")
    private String courierComment;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;
}
