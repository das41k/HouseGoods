package com.example.HouseGoods.favorites.controller;

import com.example.HouseGoods.favorites.dto.FavoritesResponse;
import com.example.HouseGoods.favorites.service.FavoritesService;
import com.example.HouseGoods.security.authorization.ClientDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@Slf4j
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoritesService favoritesService;

    @GetMapping("/my")
    public ResponseEntity<List<FavoritesResponse>> getMyFavorites(@AuthenticationPrincipal
                          ClientDetails clientDetails) {
        log.debug("GET /api/favorites/my");
        String email = clientDetails.getUsername();
        return ResponseEntity.ok(favoritesService.getMyFavorites(email));
    }

    @PostMapping("/{sku}")
    public ResponseEntity<?> saveNewFavorite(@PathVariable String sku,
            @AuthenticationPrincipal ClientDetails clientDetails) {
        log.debug("POST /api/favorites/sku : {}", sku);
        String email = clientDetails.getUsername();
        favoritesService.saveNewFavorite(email, sku);
        return ResponseEntity.ok("Товар был успешно добавлен в избранное");
    }
}
