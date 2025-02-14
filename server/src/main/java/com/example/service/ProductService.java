package com.example.service;

import com.example.pojo.Product;
import com.example.util.ProductRepository;
import com.example.util.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class contains business logic and is a service.
@Service
public class ProductService {
    // Automatically inject the ProductRepository object to interact with the
    // database.
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    // Save a single product record.
    public Product saveProduct(Product product, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            product.setImageData(imageFile.getBytes());
        }
        return productRepository.save(product);
    }

    // Save multiple product records.
    public List<Product> saveAllProducts(List<Product> products) {
        return productRepository.saveAll(products);
    }

    // Find a product by its ID.
    public Optional<Product> getProductById(int id) {
        return productRepository.findById(id);
    }

    @Transactional
    public void deleteProductById(int id) {
        cartItemRepository.deleteByProductId(id); // Delete all cart items associated with the product
        productRepository.deleteById(id);
    }

    // Get a list of all products.
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
