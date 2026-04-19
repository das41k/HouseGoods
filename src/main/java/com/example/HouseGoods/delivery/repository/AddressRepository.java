package com.example.HouseGoods.delivery.repository;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.delivery.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByClient(Client client);
}
