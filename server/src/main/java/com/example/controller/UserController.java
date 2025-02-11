package com.example.controller;

import com.example.pojo.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class is a REST controller.
@RestController
@RequestMapping("/users")
public class UserController {
    // Automatically inject the UserService object to handle business logic.
    @Autowired
    private UserService userService;

    // Endpoint to create a new user.
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Endpoint to get a user by their ID.
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    // Endpoint to get all users.
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to delete a user by their ID.
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable int id, @RequestParam String username) {
        Optional<User> requestingUser = userService.getUserByUsername(username);
        if (requestingUser.isPresent() && "admin".equals(requestingUser.get().getRole())) {
            userService.deleteUserById(id);
        } else {
            throw new RuntimeException("Only admin users can delete users");
        }
    }
}
