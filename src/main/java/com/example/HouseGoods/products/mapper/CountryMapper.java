package com.example.HouseGoods.products.mapper;

import com.example.HouseGoods.products.dto.CountryResponse;
import com.example.HouseGoods.products.entity.Country;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper {

    public CountryResponse mappingToCountryResponse(Country country) {
        return CountryResponse.builder()
                .name(country.getName())
                .code(country.getCode())
                .imageURl(country.getImageURl())
                .build();
    }
}
