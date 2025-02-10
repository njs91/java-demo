package com.example.service;

import com.example.pojo.User;
import com.example.util.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class contains business logic and is a service.
@Service
public class UserService {
    // Automatically inject the UserRepository object to interact with the database.
    @Autowired
    private UserRepository userRepository;

    // Save a single user record.
    public User saveUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        return userRepository.save(user);
    }

    // Save multiple user records.
    public List<User> saveAllUsers(List<User> users) {
        return userRepository.saveAll(users);
    }

    // Find a user by their ID.
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    // Find a user by their username.
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // Delete a user by their ID.
    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }

    // Get a list of all users.
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Implement login logic here, e.g., find user by username and check password
    public User loginUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return existingUser.get();
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

    // Change the user's password
    public User changePassword(int userId, String newPassword) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
