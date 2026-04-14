package com.example.HouseGoods.orders.mapper;

import com.example.HouseGoods.orders.Order;
import com.example.HouseGoods.orders.dto.DeliveryResponse;
import com.example.HouseGoods.orders.dto.OrderResponseByUser;
import com.example.HouseGoods.orders.entity.Delivery;
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
}
