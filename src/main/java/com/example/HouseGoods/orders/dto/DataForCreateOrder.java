package com.example.HouseGoods.orders.dto;

import com.example.HouseGoods.delivery.dto.AddressResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataForCreateOrder {
    private List<AddressResponse> addresses;
    private List<PaymentMethodResponse> paymentMethods;
}
