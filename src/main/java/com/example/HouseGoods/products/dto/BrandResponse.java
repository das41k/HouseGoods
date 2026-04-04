package com.example.HouseGoods.products.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandResponse {
    private String name;
    private String imageURl;
    private CountryResponse countryResponse;
}
