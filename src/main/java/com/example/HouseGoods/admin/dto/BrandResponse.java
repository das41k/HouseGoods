package com.example.HouseGoods.admin.dto;

import com.example.HouseGoods.products.dto.CountryResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandResponse {
    private Long id;
    private String name;
    private String imageURl;
    private CountryResponse countryResponse;
}

