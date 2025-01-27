package com.example.util;

import com.example.pojo.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

// This interface connects the Employee entity to the database.
// The JpaRepository<Employee, Integer> specifies that this repository works with the Employee entity
// and its primary key is of type Integer.
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

}
