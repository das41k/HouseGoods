package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.dto.ProductFilterRequest;
import com.example.HouseGoods.products.entity.ProductAttributeValue;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ProductSpecificationBuilder {

    // Отдельный метод для базовых фильтров (цена, бренд, категория)
    public Specification<Product> buildBaseSpecification(ProductFilterRequest filters) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // 1. Фильтр по цене
            if (filters.getMaxPrice() != null) {
                // coalesce выбирает salePrice, если он есть, иначе basePrice
                Expression<Double> currentPrice = cb.coalesce(root.get("salePrice"), root.get("basePrice"));
                predicates.add(cb.le(currentPrice, filters.getMaxPrice()));
            }

            // 2. Фильтр "Только распродажа"
            if (Boolean.TRUE.equals(filters.getIsSale())) { // Лучше проверять на TRUE явно
                predicates.add(cb.isNotNull(root.get("salePrice")));
            }

            // 3. Категория
            if (isNotBlank(filters.getCategory())) {
                predicates.add(cb.equal(root.get("category"), filters.getCategory().trim()));
            }

            // 4. Бренд
            if (isNotBlank(filters.getBrand())) {
                predicates.add(cb.equal(root.get("brand"), filters.getBrand().trim()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    public Specification<Product> buildAttributesSpecification(Map<String, String> attributes) {
        Specification<Product> spec = (Specification<Product>) null; // Начальная пустая спецификация

        if (attributes == null || attributes.isEmpty()) {
            return spec;
        }

        for (Map.Entry<String, String> entry : attributes.entrySet()) {
            String code = entry.getKey();
            String value = entry.getValue();

            // Добавляем условие AND для каждого атрибута
            spec = spec.and(hasAttribute(code, value));
        }

        return spec;
    }

    private Specification<Product> hasAttribute(String attributeCode, String attributeValue) {
        return (root, query, cb) -> {
            Subquery<Long> subquery = query.subquery(Long.class);
            Root<ProductAttributeValue> pav = subquery.from(ProductAttributeValue.class);

            subquery.select(pav.get("product").get("productId"))
                    .where(cb.and(
                            cb.equal(pav.get("attribute").get("code"), attributeCode),
                            cb.equal(pav.get("value"), attributeValue)
                    ));

            return root.get("productId").in(subquery);
        };
    }

    private boolean isNotBlank(String str) {
        return str != null && !str.trim().isEmpty();
    }
}
