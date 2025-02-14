package com.example.service;

import com.example.pojo.User;
import com.example.util.UserRepository;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// This class contains unit tests for the UserService class.
public class UserServiceTest {

    // Mock the UserRepository to simulate database operations.
    @Mock
    private UserRepository userRepository;

    // Inject the mocked UserRepository into the UserService.
    @InjectMocks
    private UserService userService;

    // A User object to be used in the tests.
    private User user;

    // This method runs before each test to set up the test environment.
    @BeforeEach
    public void init() {
        // Initialize the mocks.
        MockitoAnnotations.openMocks(this);
        // Create a new User object.
        user = new User("testUser", "testPassword", "user");
    }

    // Test the saveUser method of UserService.
    @Test
    public void testSaveUser() {
        // Simulate the save operation of the UserRepository.
        when(userRepository.save(any(User.class))).thenReturn(user);
        // Call the saveUser method and store the result.
        User savedUser = userService.saveUser(user);
        // Assert that the saved user is not null.
        Assertions.assertNotNull(savedUser);
        // Assert that the username of the saved user is "testUser".
        Assertions.assertEquals("testUser", savedUser.getUsername());
    }

    // Test the getUserById method of UserService.
    @Test
    public void testGetUserById() {
        // Simulate the findById operation of the UserRepository.
        when(userRepository.findById(anyInt())).thenReturn(Optional.of(user));
        // Call the getUserById method and store the result.
        Optional<User> foundUser = userService.getUserById(1);
        // Assert that the found user is present.
        Assertions.assertTrue(foundUser.isPresent());
        // Assert that the username of the found user is "testUser".
        Assertions.assertEquals("testUser", foundUser.get().getUsername());
    }

    // Test the loginUser method of UserService.
    @Test
    public void testLoginUser() {
        // Simulate the findByUsername operation of the UserRepository.
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        // Call the loginUser method and store the result.
        User loggedInUser = userService.loginUser(user);
        // Assert that the logged-in user is not null.
        Assertions.assertNotNull(loggedInUser);
        // Assert that the username of the logged-in user is "testUser".
        Assertions.assertEquals("testUser", loggedInUser.getUsername());
    }

    // This method runs after each test to clean up the test environment.
    @AfterEach
    public void tearDown() {
        // Set the user object to null.
        user = null;
    }
}
