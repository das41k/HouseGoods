package com.example.HouseGoods.auth;

import com.example.HouseGoods.auth.dto.LoginRequest;
import com.example.HouseGoods.auth.dto.LoginResponse;
import com.example.HouseGoods.auth.dto.RegisterRequest;
import com.example.HouseGoods.auth.exception.ClientIsAlreadyException;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        log.debug("POST /api/auth/register");
        authService.register(registerRequest);
        return new ResponseEntity<>("Пользователь успешно зарегистрирован", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        log.debug("POST /api/auth/login");
        return new ResponseEntity<>(authService.login(loginRequest), HttpStatus.OK);
    }
}
