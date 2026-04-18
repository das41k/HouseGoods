package com.example.HouseGoods.baskets.service;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.exception.BasketNotFoundException;
import com.example.HouseGoods.baskets.mapper.BasketMapper;
import com.example.HouseGoods.baskets.repository.BasketRepository;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BasketService {
    private final BasketRepository basketRepository;
    private final BasketMapper basketMapper;
    private final ClientRepository clientRepository;

    public BasketResponse getMyBasket(String email) {
        log.info("Работа BasketService::getMyBasket(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не был найден!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseThrow(() -> new BasketNotFoundException("Корзина не была найдена!"));
        return basketMapper.toBasketResponse(basket);
    }
}
