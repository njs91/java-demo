package com.example.controller;

import com.example.pojo.Order;
import com.example.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class is a REST controller.
@RestController
@RequestMapping("/orders")
public class OrderController {
    // Automatically inject the OrderService object to handle business logic.
    @Autowired
    private OrderService orderService;

    // Endpoint to create a new order.
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.saveOrder(order);
    }

    // Endpoint to get an order by its ID.
    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    // Endpoint to get all orders.
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Endpoint to delete an order by its ID.
    @DeleteMapping("/{id}")
    public void deleteOrderById(@PathVariable int id) {
        orderService.deleteOrderById(id);
    }
}
