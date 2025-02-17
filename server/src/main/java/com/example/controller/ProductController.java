package com.example.controller;

import com.example.pojo.Product;
import com.example.pojo.User;
import com.example.service.ProductService;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
// @CrossOrigin(origins = "*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    // Endpoint to create a new product.
    @PostMapping(consumes = { "multipart/form-data" })
    public Product createProduct(@RequestPart("product") Product product,
            @RequestPart("imageFile") MultipartFile imageFile) {
        try {
            return productService.saveProduct(product, imageFile);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save product", e);
        }
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

    // Endpoint to update a product by its ID.
    @PutMapping("/{id}")
    public Product updateProductById(@PathVariable int id, @RequestPart("product") Product product,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestParam String username) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid product ID");
        }
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isPresent() && "admin".equals(user.get().getRole())) {
            Optional<Product> existingProduct = productService.getProductById(id);
            if (existingProduct.isPresent()) {
                Product updatedProduct = existingProduct.get();
                updatedProduct.setName(product.getName());
                updatedProduct.setCost(product.getCost());
                updatedProduct.setCategory(product.getCategory());
                try {
                    return productService.saveProduct(updatedProduct, imageFile);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to update product", e);
                }
            } else {
                throw new RuntimeException("Product not found");
            }
        } else {
            throw new RuntimeException("Unauthorized action");
        }
    }

    // Endpoint to delete a product by its ID.
    @DeleteMapping("/{id}")
    public void deleteProductById(@PathVariable int id, @RequestParam String username) {
        if (id <= 0) {
            throw new IllegalArgumentException("Invalid product ID");
        }
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isPresent() && "admin".equals(user.get().getRole())) {
            productService.deleteProductById(id);
        } else {
            throw new RuntimeException("Unauthorized action");
        }
    }
}
