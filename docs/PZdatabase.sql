CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    image VARCHAR(255) -- Új oszlop a pizza képének URL-jéhez
);

CREATE TABLE size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    size INT,
    multiPrice INT
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
INSERT INTO pizzas (name, price, image) VALUES
('Margherita', 1000, 'images/margherita.jpg'),
('Pepperoni', 1200, 'images/pepperoni.jpg'),
('Hawaii', 1300, 'images/hawaii.jpg');

INSERT INTO toppings (name, bonusPrice) VALUES
('Sajt', 200),
('Pepperoni', 300),
('Ananász', 250),
('Sonka', 300);

-- Pizzák és toppingok összekapcsolása
INSERT INTO pizzaToppings (pizzaId, toppingId) VALUES
(1, 1), -- Margherita + Sajt
(2, 1), -- Pepperoni + Sajt
(2, 2), -- Pepperoni + Pepperoni
(3, 1), -- Hawaii + Sajt
(3, 3), -- Hawaii + Ananász
(3, 4); -- Hawaii + Sonka