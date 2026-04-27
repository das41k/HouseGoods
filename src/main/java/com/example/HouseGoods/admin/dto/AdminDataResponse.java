package com.example.HouseGoods.admin.dto;

import com.example.HouseGoods.products.dto.CategoryResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDataResponse {
    private List<CategoryResponse> categories;
    private List<BrandResponse> brands;
}
