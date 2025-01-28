// This package contains all the controller classes for handling HTTP requests.
package com.example.controller;

// Importing necessary classes and annotations.
import com.example.pojo.Employee; // The Employee entity class.
import com.example.service.EmployeeService; // The service layer to handle business logic.
import org.springframework.beans.factory.annotation.Autowired; // Annotation for dependency injection.
import org.springframework.web.bind.annotation.*; // Spring annotations for REST API endpoints.

import java.util.List; // For working with lists of employees.
import java.util.Optional; // For working with optional results.

// Mark this class as a REST controller, meaning it will handle HTTP requests and return JSON responses.
@RestController
public class EmployeeController {

    // Automatically inject the EmployeeService object using dependency injection.
    @Autowired
    EmployeeService service;

    /**
     * Handles POST requests to the "/insert" endpoint.
     *
     * @param employee The employee object sent in the request body (in JSON format).
     * @return The saved Employee object after inserting it into the database.
     */
    @PostMapping("/insert")
    public Employee insert(@RequestBody Employee employee) {
        // Pass the employee object to the service layer to save it to the database.
        return service.insertEmployee(employee);
    }

    /**
     * Handles POST requests to the "/insertAll" endpoint.
     *
     * @param employees A list of employee objects sent in the request body (in JSON format).
     * @return A list of saved Employee objects after inserting them into the database.
     */
    @PostMapping("/insertAll")
    public List<Employee> insert(@RequestBody List<Employee> employees) {
        // Pass the list of employees to the service layer to save them all at once.
        return service.insertAll(employees);
    }

    /**
     * Handles GET requests to the "/getById/{id}" endpoint.
     *
     * @param id The ID of the employee to retrieve (sent as a path variable in the URL).
     * @return An Optional object containing the Employee with the specified ID if found, or empty otherwise.
     */
    @GetMapping("/getById/{id}")
    public Optional<Employee> getByid(@PathVariable("id") int id) {
        // Call the service layer to fetch the employee by their ID.
        return service.getByid(id);
    }

    /**
     * Handles DELETE requests to the "/deleteById/{id}" endpoint.
     *
     * @param id The ID of the employee to delete (sent as a path variable in the URL).
     * @return A string message indicating whether the deletion was successful or not.
     */
    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") int id) {
        // Check if the employee with the given ID exists.
        if (service.getByid(id).isPresent()) {
            // If the employee exists, delete them using the service layer.
            service.deleteById(id);
            return "Deleted the value " + id;
        } else {
            // If the employee doesn't exist, return a "not found" message.
            return "Data is not found";
        }
    }
}
