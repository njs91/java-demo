package com.example.controller;

import com.example.pojo.Product;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private List<Product> cart = new ArrayList<>();

    // Endpoint to add a product to the cart.
    @PostMapping("/add")
    public List<Product> addProductToCart(@RequestBody Product product) {
        cart.add(product);
        return cart;
    }

    // Endpoint to view the cart.
    @GetMapping
    public List<Product> viewCart() {
        return cart;
    }
}
