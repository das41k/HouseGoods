package com.example.HouseGoods.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryRequest {
    private Long addressId;
    private LocalTime deliveryTimeFrom;
    private LocalTime deliveryTimeTo;
    private String courierComment;
    private String deliveryStatus;
}
