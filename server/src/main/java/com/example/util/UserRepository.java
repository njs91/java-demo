package com.example.util;

import com.example.pojo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// Specifies that this interface is a repository and will be used to perform CRUD operations on User entities.
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    // Additional query methods can be defined here if needed.
}
