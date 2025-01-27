package com.example.util;

import com.example.pojo.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
//pojo     primary key
public interface EmployeeRepo extends JpaRepository<Employee,Integer> {

}
