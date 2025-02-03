package com.example.util;

import com.example.pojo.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Specifies that this interface is a repository and will be used to perform CRUD operations on Product entities.
@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // Additional query methods can be defined here if needed.
}
