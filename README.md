# Java Project: eCommerce Store for Sports Shoes

This is a basic eCommerce store project for a Java course. The project focuses on the back-end implementation using Java, Hibernate, Spring Boot, Maven, and MySQL. There is a basic front-end also built in React.

## Getting Started

1. Run the back-end
2. Run the front-end with `yarn install` and `yarn start`
3. Navigate to the homepage and click the ‘Add Test Data’ button
4. To log in as an admin, use username `a` and password `a`, or to log in as a user use username `c` and password `c`
5. Most admin operations can be performed on the `/admin/management` page
6. Most user operations can be performed on the `/products` and `/user/basket` pages - you can place an order after adding products to the cart, navigating to the basket page and clicking ‘Place Order’

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
- CSS modules