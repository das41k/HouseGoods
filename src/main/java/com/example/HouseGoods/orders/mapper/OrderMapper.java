package com.example.HouseGoods.orders.mapper;

import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.delivery.dto.DeliveryResponse;
import com.example.HouseGoods.orders.dto.OrderResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.dto.ProductByOrder;
import com.example.HouseGoods.delivery.Delivery;
import com.example.HouseGoods.orders.entity.OrderItem;
import com.example.HouseGoods.products.Product;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
    public OrderResponseByUser mappingByOrderResponseByUser(Order order) {
        return OrderResponseByUser.builder()
                .orderId(order.getOrderId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .deliveryInfo(mappingByDeliveryResponse(order.getDelivery()))
                .build();
    }

    public DeliveryResponse mappingByDeliveryResponse(Delivery delivery) {
        return DeliveryResponse.builder()
                .deliveryPrice(delivery.getDeliveryPrice())
                .city(delivery.getAddress().getCity())
                .street(delivery.getAddress().getStreet())
                .house(delivery.getAddress().getHouse())
                .apartment(delivery.getAddress().getApartment())
                .entrance(delivery.getAddress().getEntrance())
                .floor(delivery.getAddress().getFloor())
                .intercom(delivery.getAddress().getIntercom())
                .deliveryTimeTo(delivery.getDeliveryTimeTo())
                .deliveryTimeFrom(delivery.getDeliveryTimeFrom())
                .courierComment(delivery.getCourierComment())
                .deliveryStatus(delivery.getDeliveryStatus().toString())
                .build();
    }

    public OrderResponse mappingByOrderResponse(Order order) {
        return OrderResponse.builder()
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .deliveryInfo(mappingByDeliveryResponse(order.getDelivery()))
                .paymentMethodTitle(order.getPaymentMethod().getName())
                .paymentMethodURl(order.getPaymentMethod().getIconUrl())
                .products(order.getOrderItems()
                        .stream()
                        .map(this::mappingByProductByOrder)
                        .toList())
                .build();
    }

    public ProductByOrder mappingByProductByOrder(OrderItem orderItem) {
        Product product = orderItem.getProduct();
        return ProductByOrder.builder()
                .sku(product.getSku())
                .name(product.getName())
                .price(orderItem.getPriceAtTime())
                .quantity(orderItem.getQuantity())
                .imgURl(product.getImageURl())
                .build();
    }
}
