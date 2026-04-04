package com.example.HouseGoods.products;

import com.example.HouseGoods.products.dto.ProductFilterRequest;
import com.example.HouseGoods.products.dto.ProductResponse;
import com.example.HouseGoods.products.dto.ProductsByCategory;
import com.example.HouseGoods.products.entity.Brand;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.entity.Country;
import com.example.HouseGoods.products.exception.BrandNotFoundException;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.exception.CountryNotFoundException;
import com.example.HouseGoods.products.exception.ProductNotFoundException;
import com.example.HouseGoods.products.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CountryRepository countryRepository;
    private final ProductMapper productMapper;
    private final ProductSpecificationBuilder specificationBuilder;

    public ProductsByCategory getProductsByCategory(String categoryName) {
        log.info("Работа ProductService: getProductsByCategory(String categoryName)");
        Category category = categoryRepository.findByTitle(categoryName)
                .orElseThrow(() -> new CategoryNotFoundException("Категория с данным именем не была найдена!"));
        List<Product> products = productRepository.findByCategory(category);
        List<ProductResponse> productResponseList = products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
        ProductsByCategory productsByCategory = new ProductsByCategory();
        productsByCategory.setCategoryName(categoryName);
        productsByCategory.setProducts(productResponseList);
        log.info("Завершение ProductService: getProductsByCategory(String categoryName)");
        return productsByCategory;
    }

    public ProductResponse getProductBySku(String sku) {
        log.info("Работа ProductService: getProductBySku(String sku)");
        Product product = productRepository.findBySku(sku)
                        .orElseThrow(() -> new ProductNotFoundException("Данный товар не был найден!"));
        log.info("Завершение ProductService: getProductBySku(String sku)");
        return productMapper.mappingByProductResponse(product);
    }

    public List<ProductResponse> getProductsByFilters(ProductFilterRequest filters) {
        log.info("Запрос товаров с фильтрами: {}", filters);

        Specification<Product> spec = specificationBuilder.buildBaseSpecification(filters);
        Specification<Product> attributeSpec = specificationBuilder.buildAttributesSpecification(filters.getAttributes());

        Specification<Product> finalSpec;
        if (attributeSpec != null) {
            finalSpec = spec.and(attributeSpec);
        } else {
            finalSpec = spec;
        }

        List<Product> products = productRepository.findAll(finalSpec);
        log.info("Найдено товаров: {}", products.size());

        return products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
    }

    public List<ProductResponse> getProductsByBrand(String brandName) {
        log.info("Работа ProductService: getProductsByBrand(String brandName)");
        Brand brand = brandRepository.findByName(brandName)
                .orElseThrow(() -> new BrandNotFoundException("Бренд с данным именем не был найден!"));
        List<Product> products = productRepository.findByBrand(brand);
        log.info("Завершение ProductService: getProductsByBrand(String brandName)");
        return products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
    }

    public List<ProductResponse> getProductsByCountry(String countryName) {
        log.info("Работа ProductService: getProductsByCountry(String countryName)");
        Country country = countryRepository.findByName(countryName)
                        .orElseThrow(() -> new CountryNotFoundException("Страна с данным названием не была найдена!"));
        List<Product> products = productRepository.findByBrand_Country(country);
        log.info("Завершение ProductService: getProductsByCountry(String countryName)");
        return products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
    }

    public List<ProductResponse> getProductsByContainsSalePrice() {
        log.info("Работа ProductService: getProductsByContainsSalePrice()");
        List<Product> products = productRepository.findBySalePriceIsNotNull();
        Comparator<Product> comparator = this::sortedByPercentSales;
        products.sort(comparator.reversed());
        return  products.stream()
                .map(productMapper::mappingByProductResponse)
                .toList();
    }

    private int sortedByPercentSales(Product pr1, Product pr2) {
        double pr1Percent = (pr1.getBasePrice() - pr1.getSalePrice()) / pr1.getBasePrice() * 100;
        double pr2Percent = (pr2.getBasePrice() - pr2.getSalePrice()) / pr2.getBasePrice() * 100;
        return Double.compare(pr1Percent, pr2Percent);
    }
}
