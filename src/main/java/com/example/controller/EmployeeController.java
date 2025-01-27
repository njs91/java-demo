package com.example.controller;

import com.example.pojo.Employee;
import com.example.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @PostMapping("/insert")
    //from postman supply the data to this object
    public Employee insert(@RequestBody Employee employee){
        return service.insertEmployee(employee);
    }
}
