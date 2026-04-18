package com.example.HouseGoods.baskets.controller;

import com.example.HouseGoods.baskets.dto.BasketResponse;
import com.example.HouseGoods.baskets.service.BasketService;
import com.example.HouseGoods.security.authorization.ClientDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
