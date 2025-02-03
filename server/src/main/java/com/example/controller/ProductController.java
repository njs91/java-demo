package com.example.controller;

import com.example.pojo.Product;
import com.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class is a REST controller.
@RestController
@RequestMapping("/products")
public class ProductController {
    // Automatically inject the ProductService object to handle business logic.
    @Autowired
    private ProductService productService;

    // Endpoint to create a new product.
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    // Endpoint to get a product by its ID.
    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable int id) {
        return productService.getProductById(id);
    }

    // Endpoint to get all products.
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Endpoint to delete a product by its ID.
    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable int id) {
        productService.deleteProductById(id);
    }
}
