package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategory(Category category);
}
