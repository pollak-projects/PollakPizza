CREATE DATABASE IF NOT EXISTS `pollakpizza` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `pollakpizza`;


CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    image VARCHAR(255) -- Új oszlop a pizza képének URL-jéhez
);

CREATE TABLE size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size INT,
    multiPrice Decimal(10,2)
);

CREATE TABLE toppings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    bonusPrice INT
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    birthdate DATE,
    address VARCHAR(255),
    admin TINYINT,
    phonenumber VARCHAR(50),
    resetPasswordToken VARCHAR(255),
    resetPasswordExpires BIGINT 
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    pizzaId INT,
    pizzaNum INT(11),
    sizeId INT,
    address VARCHAR(255),
    userPhone VARCHAR(50),
    finalPrice INT,
    status VARCHAR(50),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (pizzaId) REFERENCES pizzas(id),
    FOREIGN KEY (sizeId) REFERENCES size(id)
);

CREATE TABLE orderTops (
    orderId INT,
    toppingId INT,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (toppingId) REFERENCES toppings(id) ON DELETE CASCADE
);

CREATE TABLE pizzaToppings (
    pizzaId INT,
    toppingId INT,
    FOREIGN KEY (pizzaId) REFERENCES pizzas(id) ON DELETE CASCADE,
    FOREIGN KEY (toppingId) REFERENCES toppings(id) ON DELETE CASCADE,
    PRIMARY KEY (pizzaId, toppingId)
);

-- Alapértelmezett pizzák és toppingok beszúrása
INSERT INTO pizzas (id, name, price, image) VALUES
(0, 'Egyedi Pizza', 1000, 'src/assets/image/pizzas.jpg'),
(1, 'Margherita', 1000, 'src/assets/image/pizzas.jpg'),
(2, 'Pepperoni', 1200, 'src/assets/image/pizzas.jpg'),
(3, 'Hawaii', 1300, 'src/assets/image/pizzas.jpg'),
(4, 'Kukoricás', 1300, 'src/assets/image/pizzas.jpg'),
(5, 'Sonkás', 1300, 'src/assets/image/pizzas.jpg'),
(6, 'Kolbászos', 1300, 'src/assets/image/pizzas.jpg'),
(7, 'Baconos', 1300, 'src/assets/image/pizzas.jpg'),
(8, 'Sonkás-Gombás', 1300, 'src/assets/image/pizzas.jpg');

INSERT INTO toppings (name, bonusPrice) VALUES
('Sajt', 200),
('Pepperoni', 300),
('Ananász', 250),
('Sonka', 300),
('Kukorica', 250),
('Kolbász', 250),
('Baconos', 250),
('Gomba', 250),
('Mozzarella', 250);

-- Pizzák és toppingok összekapcsolása
INSERT INTO pizzaToppings (pizzaId, toppingId) VALUES
(1, 1), -- Margherita + Sajt
(2, 1), -- Pepperoni + Sajt
(2, 2), -- Pepperoni + Pepperoni
(3, 1), -- Hawaii + Sajt
(3, 3), 
(3, 4),
(4, 1), 
(4, 5), 
(5, 1), 
(5, 4), 
(6, 1), 
(6, 6),
(7, 1),
(7, 7),
(8, 1),
(8, 4),
(8, 8);

INSERT INTO size (size, multiPrice) VALUES
(32, 1),
(36, 1.5),
(42, 2),
(60, 2.5);