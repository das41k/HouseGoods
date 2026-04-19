package com.example.HouseGoods.orders.exception;

public class PaymentMethodNotFound extends RuntimeException {
    public PaymentMethodNotFound(String message) {
        super(message);
    }
}
