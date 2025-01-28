package com.example.util;

import com.example.pojo.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


//pojo     primary key
public interface EmployeeRepo extends JpaRepository<Employee,Integer> {
    String sql="select e.phoneNo from Employee e where e.eName=?1 and e.empNo=?2";
    @Query(sql)
    public String findPhnoByname(String ename,int id);
}
