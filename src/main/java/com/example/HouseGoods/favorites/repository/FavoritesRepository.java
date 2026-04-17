package com.example.HouseGoods.favorites.repository;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.favorites.Favorite;
import com.example.HouseGoods.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByClient(Client client);
    Optional<Favorite> findByProductAndClient(Product product, Client client);
}
