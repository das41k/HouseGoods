package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand,Long> {
    Optional<Brand> findByName(String brandName);
}
