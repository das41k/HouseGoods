package com.example.HouseGoods.orders.controller;

import com.example.HouseGoods.orders.dto.CreateOrderRequest;
import com.example.HouseGoods.orders.dto.DataForCreateOrder;
import com.example.HouseGoods.orders.dto.OrderResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.service.OrderService;
import com.example.HouseGoods.security.authorization.ClientDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/create")
    public ResponseEntity<DataForCreateOrder> getDataForCreateOrder(
            @AuthenticationPrincipal ClientDetails clientDetails
    ) {
        log.debug("GET /api/orders/create");
        String email = clientDetails.getUsername();
        return ResponseEntity.ok(orderService.getDataForCreateOrder(email));
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request,
             @AuthenticationPrincipal ClientDetails clientDetails) {
        log.debug("POST /api/orders");
        String email = clientDetails.getUsername();
        orderService.createOrder(request, email);
        return ResponseEntity.ok("Заказ был успешно создан!");
    }
}
