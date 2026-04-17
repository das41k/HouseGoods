package com.example.HouseGoods.favorites.service;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.favorites.Favorite;
import com.example.HouseGoods.favorites.dto.FavoritesResponse;
import com.example.HouseGoods.favorites.exception.FavoriteIsAlreadyException;
import com.example.HouseGoods.favorites.mapper.FavoritesMapper;
import com.example.HouseGoods.favorites.repository.FavoritesRepository;
import com.example.HouseGoods.products.Product;
import com.example.HouseGoods.products.exception.ProductNotFoundException;
import com.example.HouseGoods.products.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoritesService {
    private final FavoritesMapper favoritesMapper;
    private final FavoritesRepository favoritesRepository;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;

    public List<FavoritesResponse> getMyFavorites(String email) {
        log.info("Работа FavoriteService: getMyFavorites(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        List<Favorite> favorites = favoritesRepository.findByClient(client);
        return favorites.stream()
                .map(favoritesMapper::toFavoritesResponse)
                .toList();
    }

    public void saveNewFavorite(String email, String sku) {
        log.info("Работа FavoriteService: saveNewFavorite(String email, String sku)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        Product product = productRepository.findBySku(sku)
                .orElseThrow(() -> new ProductNotFoundException("Товар не был найден!"));
        Optional<Favorite> exist = favoritesRepository.findByProductAndClient(product, client);
        if (exist.isPresent()) {
            throw new FavoriteIsAlreadyException("Товар уже находится в избранном!");
        }
        Favorite favorite = new Favorite();
        favorite.setClient(client);
        favorite.setProduct(product);
        favorite.setDateAdded(LocalDateTime.now());
        favoritesRepository.save(favorite);
    }
}
