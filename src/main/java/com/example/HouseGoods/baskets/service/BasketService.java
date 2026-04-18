package com.example.HouseGoods.baskets.service;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.baskets.entity.BasketItem;
import com.example.HouseGoods.baskets.dto.BasketItemRequest;
import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.exception.BasketNotFoundException;
import com.example.HouseGoods.baskets.mapper.BasketMapper;
import com.example.HouseGoods.baskets.repository.BasketItemRepository;
import com.example.HouseGoods.baskets.repository.BasketRepository;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.exception.ProductNotFoundException;
import com.example.HouseGoods.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class BasketService {
    private final BasketRepository basketRepository;
    private final BasketMapper basketMapper;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final BasketItemRepository basketItemRepository;

    public BasketResponse getMyBasket(String email) {
        log.info("Работа BasketService::getMyBasket(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не был найден!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseThrow(() -> new BasketNotFoundException("Корзина не была найдена!"));
        return basketMapper.toBasketResponse(basket);
    }

    public void addNewItemWithBasket(BasketItemRequest request, String email) {
        log.info("Работа BasketService.addNewItemWithBasket(BasketAddedItemRequest request, String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не был найден!"));
        Product product = productRepository.findBySku(request.getSku())
                .orElseThrow(() -> new ProductNotFoundException("Товар не был найден!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseGet(() -> createNewBasket(client));

        Optional<BasketItem> existingItem = basket.getBasketItems().stream()
                .filter(it -> it.getProduct().getSku().equals(request.getSku()))
                .findFirst();
        if (existingItem.isPresent()) {
            BasketItem item = existingItem.get();
            int newQuantity = item.getQuantity() + request.getQuantity();
            item.setQuantity(newQuantity);
            basketItemRepository.save(item);
            log.info("Обновлено количество товара {}: {}", product.getSku(), newQuantity);
        } else {
            BasketItem newItem = new BasketItem();
            newItem.setBasket(basket);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            newItem.setPriceAtAddTime(basketMapper.getPriceByBasketItem(product, request.getQuantity()));
            basketItemRepository.save(newItem);
            log.info("Добавлен новый товар {}: {}", product.getSku(), request.getQuantity());
        }
        basket.setUpdatedAt(LocalDateTime.now());
        basketRepository.save(basket);
    }

    private Basket createNewBasket(Client client) {
        Basket basket = new  Basket();
        basket.setClient(client);
        basket.setCreatedAt(LocalDateTime.now());
        basket.setUpdatedAt(LocalDateTime.now());
        basket.setBasketItems(Collections.emptyList());
        basketRepository.save(basket);
        return basket;
    }

    public void reductionCountBasketItem(BasketItemRequest request, String email) {
        log.info("Работа BasketService: reductionCountBasketItem(BasketItemRequest request, String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не был найден!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseThrow(() -> new BasketNotFoundException("Корзина не была найдена!"));
        BasketItem item = basket.getBasketItems().stream()
                .filter(it -> it.getProduct().getSku().equals(request.getSku()))
                .findFirst()
                .orElseThrow(() -> new ProductNotFoundException("Товар не был найден в корзине!"));
        item.setQuantity(item.getQuantity() - request.getQuantity());
        basket.setUpdatedAt(LocalDateTime.now());
        basketRepository.save(basket);
        basketItemRepository.save(item);
    }
}
