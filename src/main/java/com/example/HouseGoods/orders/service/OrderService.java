package com.example.HouseGoods.orders.service;

import com.example.HouseGoods.baskets.Basket;
import com.example.HouseGoods.baskets.entity.BasketItem;
import com.example.HouseGoods.baskets.exception.BasketNotFoundException;
import com.example.HouseGoods.baskets.repository.BasketRepository;
import com.example.HouseGoods.client.Client;
import com.example.HouseGoods.client.ClientRepository;
import com.example.HouseGoods.delivery.Delivery;
import com.example.HouseGoods.delivery.dto.AddressResponse;
import com.example.HouseGoods.delivery.dto.DeliveryRequest;
import com.example.HouseGoods.delivery.entity.Address;
import com.example.HouseGoods.delivery.entity.DeliveryStatus;
import com.example.HouseGoods.delivery.exception.AddressNotFoundException;
import com.example.HouseGoods.delivery.repository.AddressRepository;
import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.orders.dto.*;
import com.example.HouseGoods.orders.entity.OrderItem;
import com.example.HouseGoods.orders.entity.PaymentMethod;
import com.example.HouseGoods.orders.exception.OrderIsNotAlreadyClient;
import com.example.HouseGoods.orders.exception.OrderNotFoundException;
import com.example.HouseGoods.orders.exception.PaymentMethodNotFound;
import com.example.HouseGoods.orders.mapper.OrderMapper;
import com.example.HouseGoods.orders.repository.OrderRepository;
import com.example.HouseGoods.orders.repository.PaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ClientRepository clientRepository;
    private final BasketRepository basketRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final AddressRepository addressRepository;
    private final OrderMapper orderMapper;

    public List<OrderResponseByUser> getOrdersByUser(String email) {
        log.info("Работа OrderService: getOrdersByUser(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        List<Order> orders = orderRepository.findByClient(client);
        return orders.stream()
                .map(orderMapper::mappingByOrderResponseByUser)
                .sorted(Comparator.comparing(OrderResponseByUser::getOrderDate).reversed())
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

    public DataForCreateOrder getDataForCreateOrder(String email) {
        log.info("Работа OrderService: getDataForCreateOrder(String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        List<AddressResponse> addresses = addressRepository.findByClient(client)
                .stream()
                .map(this::toAddressResponse)
                .toList();
        List<PaymentMethodResponse> paymentMethods = paymentMethodRepository.findAll()
                .stream()
                .map(this::toPaymentMethodResponse)
                .toList();
        return new  DataForCreateOrder(addresses, paymentMethods);
    }

    private AddressResponse toAddressResponse(Address address) {
        return AddressResponse.builder()
                .addressId(address.getAddressId())
                .city(address.getCity())
                .street(address.getStreet())
                .house(address.getHouse())
                .apartment(address.getApartment())
                .entrance(address.getEntrance())
                .floor(address.getFloor())
                .intercom(address.getIntercom())
                .build();
    }

    private PaymentMethodResponse toPaymentMethodResponse(PaymentMethod paymentMethod) {
        return PaymentMethodResponse.builder()
                .name(paymentMethod.getName())
                .code(paymentMethod.getCode())
                .description(paymentMethod.getDescription())
                .iconUrl(paymentMethod.getIconUrl())
                .build();
    }

    public void createOrder(CreateOrderRequest request, String email) {
        log.info("Работа OrderService: createOrder(CreateOrderRequest request, String email)");
        Client client = clientRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден в системе!"));
        Basket basket = basketRepository.findByClient(client)
                .orElseThrow(() -> new BasketNotFoundException("Корзина не была найдена!"));
        PaymentMethod paymentMethod = paymentMethodRepository.findByCode(request.getCodePayment())
                .orElseThrow(() -> new PaymentMethodNotFound("Данный способ оплаты не был найден!"));
        Address address = addressRepository.findById(request.getDeliveryInfo().getAddressId())
                .orElseThrow(() -> new AddressNotFoundException("Адрес не был найден!"));

        Order order = new Order();
        order.setClient(client);
        order.setPaymentMethod(paymentMethod);
        order.setOrderDate(LocalDateTime.now());

        List<OrderItem> orderItems = createOrderItemsByOrderWithBasket(basket, order);
        order.setOrderItems(orderItems);

        Double totalAmount = getTotalPrice(orderItems);
        order.setTotalAmount(totalAmount);

        Delivery delivery = createDeliveryByOrder(address, request.getDeliveryInfo(), totalAmount);
        order.setDelivery(delivery);

        orderRepository.save(order);
        basket.getBasketItems().clear();
        basketRepository.save(basket);
    }

    private Delivery createDeliveryByOrder(Address address, DeliveryRequest deliveryRequest,
                                           Double totalAmount) {
        Delivery delivery = new Delivery();
        delivery.setAddress(address);
        delivery.setDeliveryTimeTo(deliveryRequest.getDeliveryTimeTo());
        delivery.setDeliveryTimeFrom(deliveryRequest.getDeliveryTimeFrom());
        delivery.setDeliveryStatus(DeliveryStatus.valueOf(deliveryRequest.getDeliveryStatus()));
        delivery.setCourierComment(deliveryRequest.getCourierComment());
        delivery.setDeliveryPrice(calculateDeliveryPrice(totalAmount));
        return delivery;
    }

    private Double calculateDeliveryPrice(Double totalAmount) {
        if (totalAmount <= 1000) {
            return 0.0;  // До 1000₽ - бесплатно
        } else if (totalAmount <= 3000) {
            return totalAmount * 0.05;  // 5%
        } else if (totalAmount <= 5000) {
            return totalAmount * 0.08;  // 8%
        } else {
            return totalAmount * 0.12;  // 12%
        }
    }

    private List<OrderItem> createOrderItemsByOrderWithBasket(Basket basket, Order order) {
        return basket.getBasketItems()
                .stream()
                .map(item -> toOrderItemWithBasketItem(item, order))
                .toList();
    }

    private OrderItem toOrderItemWithBasketItem(BasketItem basketItem, Order order) {
        OrderItem orderItem = new OrderItem();
        orderItem.setProduct(basketItem.getProduct());
        orderItem.setQuantity(basketItem.getQuantity());
        orderItem.setPriceAtTime(basketItem.getPriceAtAddTime());
        orderItem.setOrder(order);
        return orderItem;
    }

    private Double getTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
                .mapToDouble(order -> order.getPriceAtTime() * order.getQuantity())
                .sum();
    }
}
