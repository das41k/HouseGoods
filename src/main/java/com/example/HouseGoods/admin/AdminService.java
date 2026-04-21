package com.example.HouseGoods.admin;

import com.example.HouseGoods.admin.dto.UpdateCreateBrandRequest;
import com.example.HouseGoods.admin.dto.UpdateCreateCategoryRequest;
import com.example.HouseGoods.admin.dto.UpdateCreateProductAttributeRequest;
import com.example.HouseGoods.admin.dto.UpdateCreateProductRequest;
import com.example.HouseGoods.admin.exception.BrandIsAlreadyException;
import com.example.HouseGoods.admin.exception.CategoryIsAlreadyException;
import com.example.HouseGoods.admin.exception.ProductIsAlreadyException;
import com.example.HouseGoods.admin.exception.ProductsExistsException;
import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.entity.Attribute;
import com.example.HouseGoods.products.entity.Brand;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.entity.Country;
import com.example.HouseGoods.products.entity.ProductAttributeValue;
import com.example.HouseGoods.products.exception.AttributeNotFoundException;
import com.example.HouseGoods.products.exception.BrandNotFoundException;
import com.example.HouseGoods.products.exception.CategoryNotFoundException;
import com.example.HouseGoods.products.exception.CountryNotFoundException;
import com.example.HouseGoods.products.repository.AttributeRepository;
import com.example.HouseGoods.products.repository.BrandRepository;
import com.example.HouseGoods.products.repository.CategoryRepository;
import com.example.HouseGoods.products.repository.CountryRepository;
import com.example.HouseGoods.products.repository.ProductAttributeValueRepository;
import com.example.HouseGoods.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final CountryRepository countryRepository;
    private final ProductRepository productRepository;
    private final AttributeRepository attributeRepository;
    private final ProductAttributeValueRepository productAttributeValueRepository;

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

    public void createBrand(UpdateCreateBrandRequest request) {
        log.info("AdminService: createBrand");
        Optional<Brand> existBrand = brandRepository.findByName(request.getName());
        if (existBrand.isPresent()) {
            throw new BrandIsAlreadyException("Бренд с таким названием уже есть в системе");
        }
        Country country = countryRepository.findByCode(request.getCountryCode())
                .orElseThrow(() -> new CountryNotFoundException("Указанная страна не была найдена!"));
        Brand brand = new Brand();
        initializeBrand(request, brand, country);
        brandRepository.save(brand);
    }

    public void updateBrand(Long brandId, UpdateCreateBrandRequest request) {
        log.info("AdminService: updateBrand");
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new BrandNotFoundException("Бренд не был найден!"));
        Country country = countryRepository.findByCode(request.getCountryCode())
                .orElseThrow(() -> new CountryNotFoundException("Указанная страна не была найдена!"));
        initializeBrand(request, brand, country);
        brandRepository.save(brand);
    }

    public void deleteBrand(Long brandId) {
        log.info("AdminService: deleteBrand");
        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() -> new BrandNotFoundException("Бренд не был найден!"));
        List<Product> products = brand.getProducts();
        if (products != null && !products.isEmpty()) {
            throw new ProductsExistsException(
                    String.format("Невозможно удалить бренд '%s', так как в ней содержится %d товаров. " +
                                    "Сначала переместите или удалите товары.",
                            brand.getName(),brand.getProducts().size())
            );
        }
        brandRepository.delete(brand);
    }

    private void initializeBrand(UpdateCreateBrandRequest request, Brand brand, Country country) {
        brand.setName(request.getName());
        brand.setImageURl(request.getImageURl());
        brand.setCountry(country);
    }

    @Transactional
    public void createProduct(UpdateCreateProductRequest request) {
        Optional<Product> existProduct = productRepository.findBySku(request.getSku());
        if (existProduct.isPresent()) {
            throw new ProductIsAlreadyException("РўРѕРІР°СЂ СЃ С‚Р°РєРёРј SKU СѓР¶Рµ РµСЃС‚СЊ РІ СЃРёСЃС‚РµРјРµ!");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new CategoryNotFoundException("РљР°С‚РµРіРѕСЂРёСЏ РЅРµ Р±С‹Р»Р° РЅР°Р№РґРµРЅР°!"));

        Brand brand = null;
        if (request.getBrandId() != null) {
            brand = brandRepository.findById(request.getBrandId())
                    .orElseThrow(() -> new BrandNotFoundException("Р‘СЂРµРЅРґ РЅРµ Р±С‹Р» РЅР°Р№РґРµРЅ!"));
        }

        Product product = new Product();
        initializeProduct(request, product, category, brand);
        productRepository.save(product);

        List<ProductAttributeValue> productAttributeValues =
                initializeProductAttributeValues(request.getAttributes(), product);

        if (!productAttributeValues.isEmpty()) {
            productAttributeValueRepository.saveAll(productAttributeValues);
        }
    }

    private void initializeProduct(UpdateCreateProductRequest request,
                                   Product product,
                                   Category category,
                                   Brand brand) {
        product.setSku(request.getSku());
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setBasePrice(request.getBasePrice());
        product.setSalePrice(request.getSalePrice());
        product.setCount(request.getCount());
        product.setImageURl(request.getImageURl());
        product.setWeight(request.getWeightKg());
        product.setLength(request.getLengthCm());
        product.setWidth(request.getWidthCm());
        product.setHeight(request.getHeightCm());
        product.setCategory(category);
        product.setBrand(brand);
    }

    private List<ProductAttributeValue> initializeProductAttributeValues(
            List<UpdateCreateProductAttributeRequest> requests,
            Product product) {
        if (requests == null || requests.isEmpty()) {
            return List.of();
        }

        List<ProductAttributeValue> productAttributeValues = new ArrayList<>();
        for (UpdateCreateProductAttributeRequest request : requests) {
            Attribute attribute = resolveAttribute(request);

            ProductAttributeValue productAttributeValue = new ProductAttributeValue();
            productAttributeValue.setProduct(product);
            productAttributeValue.setAttribute(attribute);
            productAttributeValue.setValue(request.getValue());
            productAttributeValue.setUnit(request.getUnit());
            productAttributeValues.add(productAttributeValue);
        }

        return productAttributeValues;
    }

    private Attribute resolveAttribute(UpdateCreateProductAttributeRequest request) {
        if (request.getAttributeId() != null) {
            return attributeRepository.findById(request.getAttributeId())
                    .orElseThrow(() -> new AttributeNotFoundException("РђС‚СЂРёР±СѓС‚ РЅРµ Р±С‹Р» РЅР°Р№РґРµРЅ!"));
        }

        if (request.getAttributeCode() != null && !request.getAttributeCode().isBlank()) {
            Optional<Attribute> existAttributeByCode = attributeRepository.findByCode(request.getAttributeCode());
            if (existAttributeByCode.isPresent()) {
                return existAttributeByCode.get();
            }
        }

        if (request.getAttributeName() != null && !request.getAttributeName().isBlank()) {
            Optional<Attribute> existAttributeByName = attributeRepository.findByName(request.getAttributeName());
            if (existAttributeByName.isPresent()) {
                return existAttributeByName.get();
            }
        }

        if ((request.getAttributeName() == null || request.getAttributeName().isBlank())
                && (request.getAttributeCode() == null || request.getAttributeCode().isBlank())) {
            throw new AttributeNotFoundException("Р”Р»СЏ СЃРѕР·РґР°РЅРёСЏ РЅРѕРІРѕРіРѕ Р°С‚СЂРёР±СѓС‚Р° РЅСѓР¶РЅРѕ СѓРєР°Р·Р°С‚СЊ РЅР°Р·РІР°РЅРёРµ РёР»Рё РєРѕРґ!");
        }

        Attribute attribute = new Attribute();
        attribute.setName(request.getAttributeName());
        attribute.setCode(buildAttributeCode(request));
        attribute.setIsFilterable(Boolean.TRUE.equals(request.getIsFilterable()));
        return attributeRepository.save(attribute);
    }

    private String buildAttributeCode(UpdateCreateProductAttributeRequest request) {
        if (request.getAttributeCode() != null && !request.getAttributeCode().isBlank()) {
            return request.getAttributeCode().trim().toLowerCase(Locale.ROOT);
        }

        String attributeName = request.getAttributeName();
        String code = attributeName.trim()
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^\\p{L}\\p{Nd}]+", "_")
                .replaceAll("^_+|_+$", "");

        if (code.isBlank()) {
            throw new AttributeNotFoundException("РќРµ СѓРґР°Р»РѕСЃСЊ СЃС„РѕСЂРјРёСЂРѕРІР°С‚СЊ РєРѕРґ Р°С‚СЂРёР±СѓС‚Р°!");
        }

        return code;
    }
}
