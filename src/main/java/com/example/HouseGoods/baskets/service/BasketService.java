package com.example.HouseGoods.baskets.service;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.baskets.entity.BasketItem;
import com.example.HouseGoods.baskets.dto.BasketAddedItemRequest;
import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.exception.BasketNotFoundException;
import com.example.HouseGoods.baskets.exception.ProductIsFoundException;
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

    public void addNewItemWithBasket(BasketAddedItemRequest request, String email) {
        log.info("Работа BasketService.addNewItemWithBasket(BasketAddedItemRequest request, String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не был найден!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseThrow(() -> new BasketNotFoundException("Корзина не была найдена!"));
        Product product = productRepository.findBySku(request.getSku())
                .orElseThrow(() -> new ProductNotFoundException("Товар не был найден!"));
        Optional<BasketItem> item = basket.getBasketItems().stream()
                .filter(it -> it.getProduct().getSku().equals(request.getSku()))
                .findFirst();
        if (item.isPresent()) {
            throw new ProductIsFoundException("Товар уже есть в корзине!");
        }

        BasketItem basketItem = new BasketItem();
        basketItem.setProduct(product);
        basketItem.setBasket(basket);
        basketItem.setQuantity(request.getQuantity());
        basketItem.setPriceAtAddTime(basketMapper.getPriceByBasketItem(product, request.getQuantity()));
        basketItemRepository.save(basketItem);
    }
}
