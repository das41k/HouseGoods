package com.example.HouseGoods.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeliveryResponse {
    private Double deliveryPrice;
    private String city;
    private String street;
    private String house;
    private String apartment;
    private String entrance;       // Подъезд
    private Integer floor;         // Этаж
    private String intercom;       // Домофон
    private LocalTime deliveryTimeFrom;
    private LocalTime deliveryTimeTo;
    private String courierComment;
    private String deliveryStatus;
}
