package com.example.HouseGoods.products.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "attributes_values")
@Data
public class AttributeValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attribute_id", nullable = false)
    private Attribute attribute;

    @Column(name = "value", nullable = false)
    private String value;
}
