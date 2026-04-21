package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.entity.ProductAttributeValue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductAttributeValueRepository extends JpaRepository<ProductAttributeValue, Long> {
    List<ProductAttributeValue> findByProduct(Product product);
}
