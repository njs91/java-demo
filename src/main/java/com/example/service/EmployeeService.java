package com.example.service;

import com.example.pojo.Employee;
import com.example.util.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// This annotation tells Spring that this class contains business logic and is a service.
@Service
public class EmployeeService {
    // Automatically inject the EmployeeRepo object to interact with the database.
    @Autowired
    EmployeeRepo repo;

    // Save a single employee record.
    public Employee insertEmployee(Employee employee) {
        return repo.save(employee);
    }

    // Save multiple employee records.
    public List<Employee> insertAll(List<Employee> employees) {
        return repo.saveAll(employees);
    }

    // Find an employee by their ID.
    public Optional<Employee> getByid(int id) {
        return repo.findById(id);
    }

    // Delete an employee by their ID.
    public void deleteById(int id) {
        repo.deleteById(id); // Use the deleteById method provided by JpaRepository.
    }

    // Get the phone number of an employee by their name and ID.
    public String getPhoneByName(String eName, int id) {
        return repo.getPhoneByName(eName, id);
    }

    // Get employee details by their ID.
    public Object[] findByEmpno(int id) {
        return repo.findByEmpno(id);
    }
}
