package com.example.HouseGoods.baskets.repository;

import com.example.HouseGoods.baskets.entity.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketItemRepository extends JpaRepository<BasketItem,Long> {
}
