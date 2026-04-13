package com.example.HouseGoods.security.authorization;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ClientDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Client client =findByEmailOrPhone(login);
        return new ClientDetails(client);
    }

    private Client findByEmailOrPhone(String login) {
        if (login.contains("@")) {
            return clientRepository.findByEmail(login)
                    .orElseThrow(() -> new UsernameNotFoundException("Пользователь с данным email не найден!"));
        }
        return clientRepository.findByPhone(login)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь с данным номером не найден!"));
    }
}
