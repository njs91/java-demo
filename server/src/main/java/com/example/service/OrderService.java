package com.example.service;

import com.example.pojo.Order;
import com.example.util.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class contains business logic and is a service.
@Service
public class OrderService {
    // Automatically inject the OrderRepository object to interact with the
    // database.
    @Autowired
    private OrderRepository orderRepository;

    // Save a single order record.
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    // Save multiple order records.
    public List<Order> saveAllOrders(List<Order> orders) {
        return orderRepository.saveAll(orders);
    }

    // Find an order by its ID.
    public Optional<Order> getOrderById(int id) {
        return orderRepository.findById(id);
    }

    // Delete an order by its ID.
    public void deleteOrderById(int id) {
        orderRepository.deleteById(id);
    }

    // Get a list of all orders.
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
