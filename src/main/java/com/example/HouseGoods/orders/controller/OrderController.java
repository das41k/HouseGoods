package com.example.HouseGoods.orders.controller;

import com.example.HouseGoods.orders.dto.OrderResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.service.OrderService;
import com.example.HouseGoods.security.authorization.ClientDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Slf4j
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponseByUser>> getMyOrders
            (@AuthenticationPrincipal ClientDetails clientDetails) {
        log.debug("GET /api/orders/my");
        String email = clientDetails.getUsername();
        return ResponseEntity.ok(orderService.getOrdersByUser(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id,
             @AuthenticationPrincipal ClientDetails clientDetails) {
        log.debug("GET /api/orders/{}", id);
        String email = clientDetails.getUsername();
        return ResponseEntity.ok(orderService.getOrderById(id, email));
    }
}
