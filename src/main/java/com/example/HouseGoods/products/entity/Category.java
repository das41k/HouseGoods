package com.example.HouseGoods.products.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "categories")
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "title", nullable = false, unique = true, length = 200)
    private String title;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category categoryParent;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url", length = 500)
    private String imageURl;
}
