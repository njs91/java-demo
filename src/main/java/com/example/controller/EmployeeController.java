package com.example.controller;

import com.example.pojo.Employee;
import com.example.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// Mark this class as a REST controller, meaning it will handle HTTP requests and return responses in JSON format.
@RestController
public class EmployeeController {

    // Automatically inject the EmployeeService object (dependency injection).
    @Autowired
    EmployeeService service;

    // This method handles POST requests to the "/insert" endpoint.
    // It takes an Employee object as input from the request body (JSON) and returns the saved Employee object.
    @PostMapping("/insert")
    public Employee insert(@RequestBody Employee employee) {
        // Call the service layer to insert the employee into the database.
        return service.insertEmployee(employee);
    }
}