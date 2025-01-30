# Project Summary

This project demonstrates a simple Spring Boot application for managing employee data. It follows the **MVC (Model-View-Controller)** architecture, making the code well-structured and easy to maintain.

## **Files Overview**

### 1. **EmployeeController.java**
- **Purpose**: Manages HTTP requests from clients (e.g., Postman or a web application).
- **Functionality**: Handles the `/insert` endpoint for adding a new employee.
- **Key Points**:
    - Annotated with `@RestController` to handle HTTP requests.
    - Uses the `@PostMapping` annotation to handle POST requests.
    - Accepts an `Employee` object as input from the request body (JSON format) and passes it to the service layer.

---

### 2. **Employee.java**
- **Purpose**: Represents the `Employee` entity (i.e., the structure of the `Employee` table in the database).
- **Key Points**:
    - Annotated with `@Entity` to map this class to a database table.
    - Contains fields:
        - `empNo` (Employee number - Primary Key).
        - `eName` (Employee name).
        - `phoneNo` (Employee phone number).
    - Includes getter and setter methods for all fields.

---

### 3. **EmployeeService.java**
- **Purpose**: Contains the **business logic** for processing employee data.
- **Functionality**:
    - Handles operations like inserting an employee into the database.
    - Uses the `repo.save()` method to save the employee to the database.
- **Key Points**:
    - Annotated with `@Service` to indicate it is part of the service layer.
    - Interacts with `EmployeeRepo` to perform database operations.

---

### 4. **EmployeeRepo.java**
- **Purpose**: Acts as the **repository layer** for interacting with the database.
- **Functionality**:
    - Extends `JpaRepository<Employee, Integer>` to provide built-in methods for CRUD operations.
    - Works with the `Employee` entity, where the primary key is of type `Integer`.

---

## **How the Application Works**
1. The client sends a POST request to the `/insert` endpoint with an employee's details in JSON format.
2. The `EmployeeController` receives the request and passes the employee data to the `EmployeeService`.
3. The `EmployeeService` processes the data and calls the `EmployeeRepo` to save it to the database.
4. The `EmployeeRepo` uses JPA (Java Persistence API) to interact with the database and store the employee record.
5. A response is sent back to the client with the saved employee details.

---

## **Architecture**
The project follows the **MVC (Model-View-Controller)** architecture:
- **Model**:
    - `Employee.java` - Defines the structure of the `Employee` entity.
- **Controller**:
    - `EmployeeController.java` - Handles HTTP requests and routes them to the service layer.
- **Service**:
    - `EmployeeService.java` - Contains the business logic for employee-related operations.
- **Repository**:
    - `EmployeeRepo.java` - Provides database interaction methods through JPA.

---

## **Technologies Used**
- **Java**: Programming language.
- **Spring Boot**: Framework for building the application.
- **Spring Data JPA**: For database interaction.
- **Hibernate**: ORM (Object Relational Mapping) tool.
- **H2 Database** (or another database of your choice): To store employee records.
