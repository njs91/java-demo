package com.example.service;

import com.example.pojo.Employee;
import com.example.util.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

// This annotation tells Spring that this class contains business logic and is a service.
@Service
public class EmployeeService {
    // Automatically inject the EmployeeRepo object to interact with the database.
    @Autowired
    EmployeeRepo repo;

    // This method takes an Employee object and saves it to the database using the repository.
    public Employee insertEmployee(Employee employee) {
        // The save() method is a built-in method provided by JpaRepository to insert or update records in the database.
        return repo.save(employee);
    }
}
