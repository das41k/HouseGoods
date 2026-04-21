package com.example.HouseGoods.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCreateProductRequest {
    private String sku;
    private String name;
    private String description;
    private Double basePrice;
    private Double salePrice;
    private Integer count;
    private String imageURl;
    private Double weightKg;
    private Double lengthCm;
    private Double widthCm;
    private Double heightCm;
    private Long categoryId;
    private Long brandId;
    private List<UpdateCreateProductAttributeRequest> attributes;
}
