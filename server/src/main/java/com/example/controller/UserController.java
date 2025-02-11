package com.example.controller;

import com.example.pojo.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

    // Endpoint to search users by username.
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String username) {
        return userService.searchUsersByUsername(username);
    }

    // Endpoint to delete a user by their ID.
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable int id, @RequestBody Map<String, String> requestBody) {
        String username = requestBody.get("username");
        Optional<User> requestingUser = userService.getUserByUsername(username);
        if (requestingUser.isPresent() && "admin".equals(requestingUser.get().getRole())) {
            userService.deleteUserById(id);
        } else {
            throw new RuntimeException("Only admin users can delete users");
        }
    }

    // Endpoint to update a user.
    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody Map<String, Object> requestBody) {
        String username = (String) requestBody.get("username");
        Optional<User> requestingUser = userService.getUserByUsername(username);
        if (requestingUser.isPresent() && "admin".equals(requestingUser.get().getRole())) {
            User updatedUser = new User();
            updatedUser.setUserId(id);
            updatedUser.setUsername((String) requestBody.get("updatedUsername"));
            updatedUser.setPassword((String) requestBody.get("newPassword"));
            updatedUser.setRole((String) requestBody.get("role"));
            return userService.updateUser(id, updatedUser);
        } else {
            throw new RuntimeException("Only admin users can update users");
        }
    }

    // Endpoint to register a new user.
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Endpoint to login a user.
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    // Endpoint to change a user's password.
    @PutMapping("/change-password")
    public User changePassword(@RequestParam int userId, @RequestParam String newPassword) {
        return userService.changePassword(userId, newPassword);
    }
}
