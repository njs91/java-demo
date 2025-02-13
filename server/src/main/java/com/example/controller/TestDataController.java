package com.example.controller;

import com.example.pojo.Cart;
import com.example.pojo.Product;
import com.example.pojo.User;
import com.example.service.CartService;
import com.example.service.ProductService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        // Insert users
        userService.saveUser(new User("a", "a", "admin"));
        userService.saveUser(new User("b", "b", "admin"));
        User userC = userService.saveUser(new User("c", "c", "user"));

        // Insert products
        Product product1 = productService.saveProduct(new Product("Product 1", 19.99, "image1.jpg", "Category A"));
        productService.saveProduct(new Product("Product 2", 29.99, "image2.jpg", "Category B"));
        Product product3 = productService.saveProduct(new Product("Product 3", 39.99, "image3.jpg", "Category C"));
        productService.saveProduct(new Product("Product 4", 49.99, "image4.jpg", "Category D"));
        productService.saveProduct(new Product("Product 5", 59.99, "image5.jpg", "Category E"));
        productService.saveProduct(new Product("Sports Shoes", 79.99, "sports_shoes.jpg", "Footwear"));

        // Create cart for user "c" and add products 1 and 3
        Cart cart = cartService.getOrCreateCart(userC.getId());
        cartService.addItemToCart(cart.getId(), product1.getProductId(), 1);
        cartService.addItemToCart(cart.getId(), product3.getProductId(), 1);
    }
}
