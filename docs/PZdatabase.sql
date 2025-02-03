CREATE TABLE pizzas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT
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
    phonenumber VARCHAR(50)
);

CREATE TABLE rendeles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    pizzaId INT,
    sizeId INT,
    address VARCHAR(255),
    userPhone VARCHAR(50),
    finalPrice INT,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (pizzaId) REFERENCES pizzas(id),
    FOREIGN KEY (sizeId) REFERENCES size(id)
);

CREATE TABLE orderDone (
    orderId INT,
    startDate DATE,
    FOREIGN KEY (orderId) REFERENCES rendeles(id)
);

CREATE TABLE orderTops (
    orderId INT,
    toppingId INT,
    FOREIGN KEY (orderId) REFERENCES rendeles(id),
    FOREIGN KEY (toppingId) REFERENCES toppings(id)
);
