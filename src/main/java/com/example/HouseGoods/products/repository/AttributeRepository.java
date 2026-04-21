package com.example.HouseGoods.products.repository;

import com.example.HouseGoods.products.entity.Attribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {
    Optional<Attribute> findByCode(String code);
    Optional<Attribute> findByName(String name);
}
