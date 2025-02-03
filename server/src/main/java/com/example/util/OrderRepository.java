package com.example.util;

import com.example.pojo.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Specifies that this interface is a repository and will be used to perform CRUD operations on Order entities.
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Additional query methods can be defined here if needed.
}
