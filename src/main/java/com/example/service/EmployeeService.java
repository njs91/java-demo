package com.example.service;

import com.example.pojo.Employee;
import com.example.util.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

//DAO - CRUD opr
@Service
public class EmployeeService {
    @Autowired
    EmployeeRepo repo;

    //insert
    public Employee insertEmployee(Employee employee){
        //on hibernate side save is the method to perform predefined operation of insertion
        return repo.save(employee);
    }
}
