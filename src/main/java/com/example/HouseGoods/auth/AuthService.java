package com.example.HouseGoods.auth;

import com.example.HouseGoods.auth.dto.LoginRequest;
import com.example.HouseGoods.auth.dto.LoginResponse;
import com.example.HouseGoods.auth.dto.RegisterRequest;
import com.example.HouseGoods.auth.exception.ClientIsAlreadyException;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.security.authorization.ClientDetails;
import com.example.HouseGoods.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public void register(RegisterRequest registerRequest) {
        log.info("Работа AuthService: register(RegisterRequest)");
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

    public LoginResponse login(LoginRequest loginRequest) {
        log.info("Работа AuthService: login(LoginRequest)");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getLogin(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        ClientDetails clientDetails = (ClientDetails) authentication.getPrincipal();
        String jwt =  jwtUtils.generateJwtToken(authentication);
        String role =  clientDetails.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("ROLE_USER");

        log.info("Успешный вход пользователя: {}", loginRequest.getLogin());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwt);
        loginResponse.setRole(role);
        loginResponse.setEmail(clientDetails.getClient().getEmail());
        loginResponse.setPhone(clientDetails.getClient().getPhone());
        loginResponse.setUsername(clientDetails.getClient().getUsername());
        return loginResponse;
    }
}
