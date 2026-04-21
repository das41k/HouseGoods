package com.example.HouseGoods.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCreateBrandRequest {
    private String name;
    private String imageURl;
    private String countryCode;
}
