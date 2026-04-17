package com.example.HouseGoods.favorites.service;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.favorites.Favorite;
import com.example.HouseGoods.favorites.dto.FavoritesResponse;
import com.example.HouseGoods.favorites.mapper.FavoritesMapper;
import com.example.HouseGoods.favorites.repository.FavoritesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class FavoritesService {
    private final FavoritesMapper favoritesMapper;
    private final FavoritesRepository favoritesRepository;
    private final ClientRepository clientRepository;

    public List<FavoritesResponse> getMyFavorites(String email) {
        log.info("Работа FavoriteService: getMyFavorites(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        List<Favorite> favorites = favoritesRepository.findByClient(client);
        return favorites.stream()
                .map(favoritesMapper::toFavoritesResponse)
                .toList();
    }
}
