package com.example.HouseGoods.baskets.controller;

import com.example.HouseGoods.baskets.dto.BasketItemRequest;
import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.service.BasketService;
import com.example.HouseGoods.security.authorization.ClientDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/baskets")
@Slf4j
@RequiredArgsConstructor
public class BasketController {
    private final BasketService basketService;

    @GetMapping("/my")
    public ResponseEntity<BasketResponse> getMyBasket(@AuthenticationPrincipal
                                                          ClientDetails clientDetails) {
        log.debug("GET /api/baskets/my");
        String email = clientDetails.getUsername();
        return ResponseEntity.ok(basketService.getMyBasket(email));
    }

    @PostMapping
    public ResponseEntity<?> addNewItemWithBasket(
            @AuthenticationPrincipal ClientDetails clientDetails,
            @RequestBody BasketItemRequest request) {
        log.debug("POST /api/baskets");
        String email = clientDetails.getUsername();
        basketService.addNewItemWithBasket(request,email);
        return ResponseEntity.ok("Товар был успешно добавлен в корзину!");
    }

    @PostMapping("/reduction")
    public ResponseEntity<?> reductionItemsWithBasket(
            @AuthenticationPrincipal ClientDetails clientDetails,
            @RequestBody BasketItemRequest request) {
        log.debug("POST /api/baskets/reduction");
        String email = clientDetails.getUsername();
        basketService.reductionCountBasketItem(request,email);
        return ResponseEntity.ok("Количество товара было изменено!");
    }
}
