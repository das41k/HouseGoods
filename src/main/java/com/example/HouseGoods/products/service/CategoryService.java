package com.example.HouseGoods.products.service;

import com.example.HouseGoods.products.dto.CategoryResponse;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.mapper.CategoryMapper;
import com.example.HouseGoods.products.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getParentCategories() {
        log.info("Работа с CategoryService: getParentCategories()");
        return categoryRepository.findByCategoryParentIsNull()
                .stream().map(categoryMapper::mappingToCategoryResponse)
                .toList();
    }

    public List<CategoryResponse> getAllCategories() {
        log.info("Работа с CategoryService: getAllCategories()");
        return categoryRepository.findAll()
                    .stream().map(categoryMapper::mappingToCategoryResponse)
                    .toList();
    }

    public List<CategoryResponse> getChildrenCategories(Long parentId) {
        log.info("Работа с CategoryService: getChildrenCategories(Long parentId)");
        Category parent = categoryRepository.findById(parentId)
                .orElseThrow(() -> new CategoryNotFoundException("Данная категория не была найдена!"));
        return categoryRepository.findByCategoryParent(parent)
                .stream().map(categoryMapper::mappingToCategoryResponse)
                .toList();
    }
}
