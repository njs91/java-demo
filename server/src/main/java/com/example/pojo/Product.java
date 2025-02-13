package com.example.pojo;

import jakarta.persistence.*;

// Specifies that this class is an entity and is mapped to a database table.
@Entity
@Table(name = "products")
public class Product {
    // This attribute is the primary key of the entity.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    // Name of the product.
    private String name;

    // Cost of the product.
    private double cost;

    // Category of the product.
    private String category;

    @Lob
    private byte[] imageData;

    // Default constructor
    public Product() {
    }

    // Constructor with parameters
    public Product(String name, double cost, byte[] imageData, String category) {
        this.name = name;
        this.cost = cost;
        this.imageData = imageData;
        this.category = category;
    }

    // Getter and setter methods for productId.
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    // Getter and setter methods for name.
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and setter methods for cost.
    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    // Getter and setter methods for category.
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }
}
