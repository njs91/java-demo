package com.example.util;

import com.example.pojo.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

// Specifies that this interface is a repository and will be used to perform CRUD operations on Order entities.
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Custom query method to get orders by user ID
    @Query("SELECT o FROM Order o WHERE o.user.id = ?1")
    List<Order> findByUserId(int userId);

    // Custom query method to filter orders by date range
    @Query("SELECT o FROM Order o WHERE o.orderDate BETWEEN ?1 AND ?2")
    List<Order> findByOrderDateBetween(LocalDate startDate, LocalDate endDate);
}

// example of old one with custom SQL:
// package com.example.util;
//
// import com.example.pojo.Employee;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

//// pojo primary key
// public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
// // SQL query to fetch the phone number of an employee based on their name and
//// employee number.
// // The question marks (?1 and ?2) are placeholders for the method parameters
//// (ename and id).
// String sql = "select e.phoneNo from Employee e where e.eName=?1 and
//// e.empNo=?2";
//
// // Custom query method to get the phone number by employee name and ID.
// @Query(sql)
// public String getPhoneByName(String ename, int id);
//
// // SQL query to fetch employee details by their ID.
// String sql1 = "select e.eName, e.phoneNo, e.emphiredate from Employee e where
//// e.empNo=?1";
//
// // Custom query method to get employee details by their ID.
// @Query(sql1)
// public Object[] findByEmpno(int id);
// }
