# Java Project: eCommerce Store for Sports Shoes

This is a basic eCommerce store project for a Java course. The project focuses on the back-end implementation using Java, Hibernate, Spring Boot, Maven, and MySQL. There is a basic front-end also built in React.

## Getting Started

1. Run the back-end (server folder)
2. Run the front-end with `yarn install` and `yarn start` (cd'd to the client folder)
3. Navigate to the homepage and click the ‘Add Test Data’ button
4. To log in as an admin, use username `a` and password `a`, or to log in as a user use username `c` and password `c`
5. You should log in as a user, add products to the basket, place an order, and then log in as an admin to see and filter the orders
6. Most admin operations can be performed on the `/admin/management` page
7. Most user operations can be performed on the `/products` and `/user/basket` pages - you can place an order after adding products to the cart, navigating to the basket page and clicking ‘Place Order’

## Requirements

### User and Admin Features
- **Account Management**
  - Admins and users can create an account with a username and password.
  - Admins and users can log in.
  - Admins and users can change their password.

### Admin Features
- **Product and User Management**
  - Admins can see a list of products and users.
  - Admins can search for users.
  - Admins can create, read, update, and delete products and users.
  - Admins can upload an image when creating a product.
  - Admins can see purchase reports filtered by date and category.

### User Features
- **Product Browsing and Cart Management**
  - Users can see a list of products.
  - Users can add products to their cart.

### Product Details
- Products have an id, name, cost, image, and category.

## Note
- Passwords do not need to be hashed.

## Tech Stack
### Back-end
- Java
- Hibernate
- Spring Boot
- Maven
- MySQL
### Front-end
- React
- TypeScript
- SCSS modules

## How the Application Works
The explanation below is an example of how the **User** works.

### Files Overview

#### 1. **UserController.java**
- **Purpose**: Manages HTTP requests related to user operations.
- **Functionality**: Handles endpoints for user registration, login, retrieval, update, and deletion.
- **Key Points**:
    - Annotated with `@RestController` to handle HTTP requests.
    - Uses various `@RequestMapping` annotations to map HTTP requests to handler methods.

#### 2. **User.java**
- **Purpose**: Represents the `User` entity (i.e., the structure of the `User` table in the database).
- **Key Points**:
    - Annotated with `@Entity` to map this class to a database table.
    - Contains fields: `id`, `username`, `password`, `role`.
    - Includes getter and setter methods for all fields.

#### 3. **UserService.java**
- **Purpose**: Contains the business logic for processing user data.
- **Functionality**:
    - Handles operations like saving, retrieving, updating, and deleting users.
    - Implements login and password change logic.
- **Key Points**:
    - Annotated with `@Service` to indicate it is part of the service layer.
    - Interacts with `UserRepository` to perform database operations.

#### 4. **UserRepository.java**
- **Purpose**: Acts as the repository layer for interacting with the database.
- **Functionality**:
    - Extends `JpaRepository<User, Integer>` to provide built-in methods for CRUD operations.
    - Works with the `User` entity, where the primary key is of type `Integer`.

### How the Application Works
1. The client sends a request to the server with user details in JSON format to create a new user.
2. The `UserController` receives the request and passes the user data to the `UserService`.
3. The `UserService` processes the data and calls the `UserRepository` to save it to the database.
4. The `UserRepository` uses JPA (Java Persistence API) to interact with the database and store the user record.
5. A response is sent back to the client with the saved user details.

### Architecture
The project follows the **MVC (Model-View-Controller)** architecture:
- **Model**:
    - `User.java` - Defines the structure of the `User` entity.
- **Controller**:
    - `UserController.java` - Handles HTTP requests and routes them to the service layer.
- **Service**:
    - `UserService.java` - Contains the business logic for user-related operations.
- **Repository**:
    - `UserRepository.java` - Provides database interaction methods through JPA.

## Running Tests

### Unit Tests
Unit tests are provided to ensure the functionality of the application. The tests are located in the respective `server/src/test/java/com/example/service` files.

### How to Run the Tests

Navigate to the server directory and run the following command to run the test with Maven:
    ```sh
    mvn test
    ```

These steps will execute the tests and display the results in the console or the IDE's test runner.