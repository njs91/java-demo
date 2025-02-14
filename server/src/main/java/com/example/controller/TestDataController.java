package com.example.controller;

import com.example.pojo.Cart;
import com.example.pojo.Product;
import com.example.pojo.User;
import com.example.service.CartService;
import com.example.service.ProductService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/test-data")
public class TestDataController {
    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public void addTestData() {
        try {
            // Insert users
            userService.saveUser(new User("a", "a", "admin"));
            userService.saveUser(new User("b", "b", "admin"));
            User userC = userService.saveUser(new User("c", "c", "user"));

            // Insert products
            Product product1 = productService.saveProduct(new Product("Product 1", 19.99, null, "Category A"), null);
            productService.saveProduct(new Product("Product 2", 29.99, null, "Category B"), null);
            Product product3 = productService.saveProduct(new Product("Product 3", 39.99, null, "Category C"), null);
            productService.saveProduct(new Product("Product 4", 49.99, null, "Category D"), null);
            productService.saveProduct(new Product("Product 5", 59.99, null, "Category E"), null);
            productService.saveProduct(new Product("Sports Shoes", 79.99, null, "Footwear"), null);

            // Create cart for user "c" and add products 1 and 3
            Cart cart = cartService.getOrCreateCart(userC.getId());
            cartService.addItemToCart(cart.getId(), product1.getId(), 1);
            cartService.addItemToCart(cart.getId(), product3.getId(), 1);
        } catch (IOException e) {
            throw new RuntimeException("Failed to add test data", e);
        }
    }
}
