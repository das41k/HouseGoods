package com.example.HouseGoods.orders.service;

import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.orders.dto.OrderResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.exception.OrderIsNotAlreadyClient;
import com.example.HouseGoods.orders.exception.OrderNotFoundException;
import com.example.HouseGoods.orders.mapper.OrderMapper;
import com.example.HouseGoods.orders.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final OrderMapper orderMapper;

    public List<OrderResponseByUser> getOrdersByUser(String email) {
        log.info("Работа OrderService: getOrdersByUser(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        List<Order> orders = orderRepository.findByClient(client);
        return orders.stream()
                .map(orderMapper::mappingByOrderResponseByUser)
                .toList();
    }

    public OrderResponse getOrderById(Long orderId, String email) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Заказ не был найден!"));
        if (!order.getClient().getEmail().equals(email)) {
            throw new OrderIsNotAlreadyClient("У вас нет доступа к данному заказу!");
        }
        return orderMapper.mappingByOrderResponse(order);
    }
}
