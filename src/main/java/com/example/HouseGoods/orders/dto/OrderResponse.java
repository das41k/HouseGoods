package com.example.HouseGoods.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private LocalDateTime orderDate;
    private Integer totalAmount;
    private Integer deliveryAmount;
    private DeliveryResponse deliveryInfo;
    private String paymentMethodTitle;
    private String paymentMethodURl;
    private List<ProductByOrder> products;
}
