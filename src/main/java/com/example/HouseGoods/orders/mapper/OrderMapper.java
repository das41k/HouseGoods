package com.example.HouseGoods.orders.mapper;

import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.orders.dto.DeliveryResponse;
import com.example.HouseGoods.orders.dto.OrderResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.dto.ProductByOrder;
import com.example.HouseGoods.orders.entity.Delivery;
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
                .deliveryAmount(order.getDeliveryPrice())
                .deliveryInfo(mappingByDeliveryResponse(order.getDelivery(), false))
                .build();
    }

    public DeliveryResponse mappingByDeliveryResponse(Delivery delivery, boolean withCommence) {
        String commence = withCommence ? delivery.getCourierComment() : null;
        return DeliveryResponse.builder()
                .city(delivery.getCity())
                .street(delivery.getStreet())
                .house(delivery.getHouse())
                .apartment(delivery.getApartment())
                .entrance(delivery.getEntrance())
                .floor(delivery.getFloor())
                .intercom(delivery.getIntercom())
                .deliveryTimeTo(delivery.getDeliveryTimeTo())
                .deliveryTimeFrom(delivery.getDeliveryTimeFrom())
                .deliveryStatus(delivery.getDeliveryStatus().name())
                .courierComment(commence)
                .build();
    }

    public OrderResponse mappingByOrderResponse(Order order) {
        return OrderResponse.builder()
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .deliveryAmount(order.getDeliveryPrice())
                .deliveryInfo(mappingByDeliveryResponse(order.getDelivery(), true))
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
