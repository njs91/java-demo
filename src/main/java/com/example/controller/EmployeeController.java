package com.example.controller;

import com.example.pojo.Employee;
import com.example.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

import java.util.Optional;

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

    @PostMapping("/insertAll")
    //from postman supply the data to this object
    public List<Employee> insert(@RequestBody List<Employee> employees){
        return service.insertAll(employees);
    }

    @GetMapping("/getById/{id}")
    public Optional<Employee> getByid(@PathVariable("id") int id){
        return service.getByid(id);
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") int id) {
        if (service.getByid(id).isPresent()) {
            service.deleteById(id); // Correct method name
            return "Deleted the value " + id;
        } else {
            return "Data is not found";
        }
    }
}