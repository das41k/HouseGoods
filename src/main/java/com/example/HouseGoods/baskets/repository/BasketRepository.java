package com.example.HouseGoods.baskets.repository;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {
    Optional<Basket> findByClient(Client client);
}
