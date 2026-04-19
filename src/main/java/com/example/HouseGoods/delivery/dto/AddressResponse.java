package com.example.HouseGoods.delivery.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponse {
    private Long addressId;
    private String city;
    private String street;
    private String house;
    private String apartment;
    private String entrance;       // Подъезд
    private Integer floor;         // Этаж
    private String intercom;       // Домофон
}
