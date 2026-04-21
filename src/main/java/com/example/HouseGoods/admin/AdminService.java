package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCategoryRequest;
import com.example.HouseGoods.products.dto.CategoryResponse;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.repository.BrandRepository;
import com.example.HouseGoods.products.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public void updateCategory(Long categoryId, UpdateCategoryRequest request) {
        log.info("Работа AdminService: updateCategory");
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Категория не была найдена!"));
        category.setTitle(request.getTitle());
        category.setDescription(request.getDescription());
        category.setImageURl(request.getImageURl());
        Category parent = null;
        if (request.getParentId() != null) {
            parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new CategoryNotFoundException("Категория не была найдена!"));
        }
        category.setCategoryParent(parent);
        categoryRepository.save(category);
    }
}
