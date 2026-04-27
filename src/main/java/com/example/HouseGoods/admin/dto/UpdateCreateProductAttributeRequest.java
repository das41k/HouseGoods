package com.example.HouseGoods.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCreateProductAttributeRequest {
    private String attributeName;
    private String attributeCode;
    private Boolean isFilterable;
    private String value;
    private String unit;
}
