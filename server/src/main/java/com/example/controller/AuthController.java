package com.example.controller;

import com.example.pojo.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    // Endpoint to register a new user.
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    // Endpoint to login a user.
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.loginUser(user); // @todo
    }

    // Endpoint to change a user's password.
    @PutMapping("/change-password")
    public User changePassword(@RequestBody User user) {
        // Implement password change logic here.
        return userService.saveUser(user);
    }
}
