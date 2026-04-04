package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.entity.Brand;
import com.example.HouseGoods.products.entity.Category;
import com.example.HouseGoods.products.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>,
        JpaSpecificationExecutor<Product> {
    List<Product> findByCategory(Category category);
    Optional<Product> findBySku(String sku);
    List<Product> findByBrand(Brand brand);
    List<Product> findByBrand_Country(Country country);
    List<Product> findBySalePriceIsNotNull();
}
