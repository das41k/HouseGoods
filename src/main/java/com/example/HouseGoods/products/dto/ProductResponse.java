package com.example.HouseGoods.products.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private String sku;
    private String name;
    private String description;
    private Double basePrice;
    private Double salePrice;
    private Integer count;

    private Double weightKg;
    private Double lengthCm;
    private Double widthCm;
    private Double heightCm;

    private CategoryInfo category;
    private BrandInfo brand;
    private List<AttributeValueDto> attributes;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryInfo {
        private Long categoryId;
        private String name;
        private String description;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BrandInfo {
        private Long brandId;
        private String name;
        private String country;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AttributeValueDto {
        private Long attributeId;
        private String attributeName;
        private String attributeCode;
        private String value;
        private Boolean isFilterable;
    }

}
