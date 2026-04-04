package com.example.HouseGoods.products.mapper;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.dto.ProductResponse;
import com.example.HouseGoods.products.entity.Brand;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.entity.ProductAttributeValue;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    public ProductResponse mappingByProductResponse(Product product) {
        if (product == null) {
            return null;
        }

        return ProductResponse
                .builder()
                .sku(product.getSku())
                .name(product.getName())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .salePrice(product.getSalePrice())
                .count(product.getCount())
                .weightKg(product.getWeight())
                .lengthCm(product.getLength())
                .widthCm(product.getWidth())
                .heightCm(product.getHeight())
                .category(mappingByCategoryInfo(product.getCategory()))
                .brand(mappingByBrandInfo(product.getBrand()))
                .attributes(mappingByAttributeValues(product.getProductAttributeValues()))
                .build();
    }

    private ProductResponse.CategoryInfo mappingByCategoryInfo(Category category) {
        if (category == null) {
            return null;
        }
        return ProductResponse.CategoryInfo.builder()
                .categoryId(category.getCategoryId())
                .name(category.getTitle())
                .description(category.getDescription())
                .build();
    }

    private ProductResponse.BrandInfo mappingByBrandInfo(Brand brand) {
        if (brand == null) {
            return null;
        }
        return ProductResponse.BrandInfo
                .builder()
                .brandId(brand.getBrandId())
                .name(brand.getName())
                .country(brand.getCountry().getName())
                .build();
    }

    private List<ProductResponse.AttributeValueDto> mappingByAttributeValues(
            List<ProductAttributeValue> productAttributeValues) {

        if (productAttributeValues == null || productAttributeValues.isEmpty()) {
            return Collections.emptyList();
        }

        return productAttributeValues.stream()
                .map(pav -> ProductResponse.AttributeValueDto.builder()
                        .attributeId(pav.getAttribute().getAttributeId())
                        .attributeName(pav.getAttribute().getName())
                        .attributeCode(pav.getAttribute().getCode())
                        .value(pav.getValue())
                        .isFilterable(pav.getAttribute().getIsFilterable())
                        .build())
                .collect(Collectors.toList());
    }
}
