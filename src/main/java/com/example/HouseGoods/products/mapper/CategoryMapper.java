package com.example.HouseGoods.products.mapper;

import com.example.HouseGoods.products.dto.CategoryResponse;
import com.example.HouseGoods.products.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryResponse mappingToCategoryResponse(Category category) {
        boolean hasChildren = category.getChildren() != null && !category.getChildren().isEmpty();
        return CategoryResponse.builder()
                .id(category.getCategoryId())
                .title(category.getTitle())
                .description(category.getDescription())
                .imageURl(category.getImageURl())
                .hasChildren(hasChildren)
                .build();
    }
}
