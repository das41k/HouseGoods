package com.example.HouseGoods.auth;

import com.example.HouseGoods.auth.dto.RegisterRequest;
import com.example.HouseGoods.auth.exception.ClientIsAlreadyException;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest registerRequest) {
        Optional<Client> clientExists = clientRepository.findByPhoneOrEmail(registerRequest.getPhone(),
                registerRequest.getEmail());
        if (clientExists.isPresent()) {
            throw new ClientIsAlreadyException("Пользователь с данной почтой или телефоном уже зарегистрирован");
        }
        Client client = mappingClientByRegisterRequest(registerRequest);
        clientRepository.save(client);
    }

    private Client mappingClientByRegisterRequest(RegisterRequest registerRequest) {
        Client client = new Client();
        client.setUsername(registerRequest.getUsername());
        client.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        client.setEmail(registerRequest.getEmail());
        client.setPhone(registerRequest.getPhone());
        return client;
    }
}
