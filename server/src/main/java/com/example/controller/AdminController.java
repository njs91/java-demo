package com.example.controller;

import com.example.pojo.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService userService;

    // Endpoint to get all users.
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Endpoint to get a user by their ID.
    @GetMapping("/users/{id}")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    // Endpoint to delete a user by their ID.
    @DeleteMapping("/users/{id}")
    public void deleteUserById(@PathVariable int id) {
        userService.deleteUserById(id);
    }

    // Endpoint to search users by username.
    @GetMapping("/users/search")
    public List<User> searchUsers(@RequestParam String username) {
        // Implement search logic here.
        return userService.getAllUsers(); // Placeholder
    }

    // Endpoint to view purchase reports filtered by date and category.
    @GetMapping("/reports")
    public String viewReports(@RequestParam String date, @RequestParam String category) {
        // Implement report viewing logic here.
        return "Report"; // Placeholder
    }
}
