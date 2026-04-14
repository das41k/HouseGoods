package com.example.HouseGoods.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponseByUser {
    private Long orderId;
    private LocalDateTime orderDate;
    private Integer totalAmount;
    private DeliveryResponse deliveryInfo;
}
