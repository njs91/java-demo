package com.example.pojo;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

// Specifies that this class is an entity and is mapped to a database table named "orders".
@Entity
@Table(name = "orders")
public class Order {
    // This attribute is the primary key of the entity.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    // Many-to-one relationship with the User entity.
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Many-to-one relationship with the Product entity.
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    // Quantity of the product ordered.
    private int quantity;

    // Order date, formatted as "yyyy-MM-dd".
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate orderDate;

    // Getter and setter methods
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }
}
