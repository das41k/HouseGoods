package com.example.HouseGoods.orders.repository;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.orders.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByClient(Client client);
}
