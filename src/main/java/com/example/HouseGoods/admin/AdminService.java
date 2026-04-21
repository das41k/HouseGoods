package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCreateCategoryRequest;
import com.example.HouseGoods.admin.exception.CategoryIsAlreadyException;
import com.example.HouseGoods.admin.exception.ProductsExistsException;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.repository.BrandRepository;
import com.example.HouseGoods.products.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public void createCategory(UpdateCreateCategoryRequest request) {
        Optional<Category> existCategory = categoryRepository.findByTitle(request.getTitle());
        if (existCategory.isPresent()) {
            throw new CategoryIsAlreadyException("Категория с таким названием уже есть в системе!");
        }
        Category category = new Category();
        initializeCategory(request, category);
        categoryRepository.save(category);
    }

    public void updateCategory(Long categoryId, UpdateCreateCategoryRequest request) {
        log.info("Работа AdminService: updateCategory");
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Категория не была найдена!"));
        initializeCategory(request, category);
        categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        log.info("AdminService: deleteCategory");
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new  CategoryNotFoundException("Категория не была найдена!"));
        if (category.getProducts() != null && !category.getProducts().isEmpty()) {
            throw new ProductsExistsException(
                    String.format("Невозможно удалить категорию '%s', так как в ней содержится %d товаров. " +
                                    "Сначала переместите или удалите товары.",
                            category.getTitle(), category.getProducts().size())
            );
        }

        Category parentOfDelete = category.getCategoryParent();
        List<Category> children = category.getChildren();
        if (children != null && !children.isEmpty()) {
            for (Category child : children) {
                child.setCategoryParent(parentOfDelete);
                categoryRepository.save(child);
            }
        }
        categoryRepository.delete(category);
    }

    private void initializeCategory(UpdateCreateCategoryRequest request, Category category) {
        category.setTitle(request.getTitle());
        category.setDescription(request.getDescription());
        category.setImageURl(request.getImageURl());
        Category parent = null;
        if (request.getParentId() != null) {
            parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new CategoryNotFoundException("Родительская категория не была найдена!"));
        }
        category.setCategoryParent(parent);
    }
}
