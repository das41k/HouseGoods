package com.example.HouseGoods.products.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "brands")
@Data
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private Long brandId;

    @Column(name = "name", unique = true, nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;
}
