package com.example.HouseGoods.products.mapper;

import com.example.HouseGoods.products.dto.BrandResponse;
import com.example.HouseGoods.products.entity.Brand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BrandMapper {

    private final CountryMapper countryMapper;

    public BrandResponse mappingToBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .name(brand.getName())
                .imageURl(brand.getImageURl())
                .countryResponse(countryMapper.mappingToCountryResponse(brand.getCountry()))
                .build();
    }
}
