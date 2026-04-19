package com.example.HouseGoods.baskets;

import com.example.HouseGoods.baskets.entity.BasketItem;
import com.example.HouseGoods.client.Client;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "baskets")
@Data
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "basket_id")
    private Long basketId;

    @OneToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "basket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BasketItem> basketItems;
}
