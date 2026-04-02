package com.example.HouseGoods.products.entity;

import com.example.HouseGoods.products.Product;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_attribute_values")
@Data
public class ProductAttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;

    @Column(name = "value", nullable = false)
    private String value;

    // опционально: дополнительная информация
    @Column(name = "unit")
    private String unit;
}
