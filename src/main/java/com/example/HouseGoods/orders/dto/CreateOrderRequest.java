package com.example.HouseGoods.orders.dto;

import com.example.HouseGoods.delivery.dto.DeliveryRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest  {
    private String codePayment;
    private DeliveryRequest deliveryInfo;
}
