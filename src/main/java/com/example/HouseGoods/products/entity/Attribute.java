package com.example.HouseGoods.products.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "attributes")
@Data
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attribute_id")
    private Long attributeId;

    @Column(name = "name", unique = true, nullable = false, length = 200)
    private String name;

    @Column(name = "code", unique = true, nullable = false, length = 100)
    private String code;

    @Column(name = "is_filterable")
    private Boolean isFilterable = false;
}
