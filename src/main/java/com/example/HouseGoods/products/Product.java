package com.example.HouseGoods.products;

import com.example.HouseGoods.products.entity.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long productId;

    @Column(name = "sku", unique = true, nullable = false, length = 100)
    private String sku;

    @Column(name = "name", nullable = false, length = 355)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(name = "sale_price")
    private Double salePrice;

    @Column(name = "count")
    private Integer count;

    @Column(name = "weight_kg")
    private Double weight;

    @Column(name = "length_cm")
    private Double length;

    @Column(name = "width_cm")
    private Double width;

    @Column(name = "height_cm")
    private Double height;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @OneToMany(mappedBy = "product")
    private List<ProductAttributeValue> productAttributeValues;
}
