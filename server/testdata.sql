-- Insert users
INSERT INTO users (username, password, role) VALUES ('a', 'a', 'admin');
INSERT INTO users (username, password, role) VALUES ('b', 'b', 'admin');
INSERT INTO users (username, password, role) VALUES ('c', 'c', 'user');

-- Insert products
INSERT INTO products (name, cost, image, category) VALUES ('Product 1', 19.99, 'image1.jpg', 'Category A');
INSERT INTO products (name, cost, image, category) VALUES ('Product 2', 29.99, 'image2.jpg', 'Category B');
INSERT INTO products (name, cost, image, category) VALUES ('Product 3', 39.99, 'image3.jpg', 'Category C');
INSERT INTO products (name, cost, image, category) VALUES ('Product 4', 49.99, 'image4.jpg', 'Category D');
INSERT INTO products (name, cost, image, category) VALUES ('Product 5', 59.99, 'image5.jpg', 'Category E');
INSERT INTO products (name, cost, image, category) VALUES ('Sports Shoes', 79.99, 'sports_shoes.jpg', 'Footwear');

-- Insert orders into the orders table
INSERT INTO orders (user_id, product_id, quantity, order_date) VALUES
(1, 1, 2, '2025-01-15'), -- Order in January 2025
(2, 2, 1, '2025-02-10'),
(3, 3, 5, '2025-02-12');