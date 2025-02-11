package com.example.pojo;

import jakarta.persistence.*;

// Specifies that this class is an entity and is mapped to a database table named "users".
@Entity
@Table(name = "users")
public class User {
    // This attribute is the primary key of the entity.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    // Username of the user.
    private String username;

    // Password of the user.
    private String password;

    // Role of the user (e.g., admin or user).
    private String role;

    // Default constructor
    public User() {
    }

    // Constructor with parameters
    public User(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Getter and setter methods for userId.
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    // Getter and setter methods for username.
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter methods for password.
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Getter and setter methods for role.
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
