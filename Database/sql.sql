CREATE TABLE `pizzak` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `name` varchar(255) DEFAULT null,
  `price` int(11) DEFAULT null
);

CREATE TABLE `rendeles` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `userId` int(11) DEFAULT null,
  `userName` varchar(255) DEFAULT null,
  `pizzaId` varchar(255) DEFAULT null,
  `sizeId` int(11) DEFAULT null,
  `address` varchar(255) DEFAULT null,
  `userPhonenumber` varchar(255) DEFAULT null,
  `finalprice` int(11) DEFAULT null
);

CREATE TABLE `rendelesdeleted` (
  `rendelesId` int(11) DEFAULT null,
  `mikor` date DEFAULT null
);

CREATE TABLE `rendelesdone` (
  `rendelesId` int(11) DEFAULT null,
  `mikor` date DEFAULT null
);

CREATE TABLE `rendelestops` (
  `rendelesId` int(11) DEFAULT null,
  `toppingId` int(11) DEFAULT null
);

CREATE TABLE `selectedtops` (
  `pizzaId` int(11) DEFAULT null,
  `toppingId` int(11) DEFAULT null
);

CREATE TABLE `size` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `size` int(11) DEFAULT null,
  `price` int(11) DEFAULT null
);

CREATE TABLE `addresses` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `userId` int(11) DEFAULT null,
  `rendelesAddress` int(11) DEFAULT null
);

CREATE TABLE `toppings` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `name` varchar(255) DEFAULT null,
  `price` int(11) DEFAULT null
);

CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `name` varchar(255) DEFAULT null,
  `email` varchar(255) DEFAULT null,
  `password` varchar(255) DEFAULT null,
  `birthdate` date DEFAULT null,
  `address` varchar(255) DEFAULT null,
  `admin` tinyint(1) DEFAULT null,
  `phonenumber` varchar(255) DEFAULT null
);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `pizzak` ADD FOREIGN KEY (`id`) REFERENCES `rendeles` (`pizzaId`);

ALTER TABLE `size` ADD FOREIGN KEY (`id`) REFERENCES `rendeles` (`sizeId`);

ALTER TABLE `toppings` ADD FOREIGN KEY (`id`) REFERENCES `rendelestops` (`toppingId`);

ALTER TABLE `toppings` ADD FOREIGN KEY (`id`) REFERENCES `selectedtops` (`toppingId`);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`id`) REFERENCES `rendelesdeleted` (`rendelesId`);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`id`) REFERENCES `rendelesdone` (`rendelesId`);

ALTER TABLE `selectedtops` ADD FOREIGN KEY (`pizzaId`) REFERENCES `pizzak` (`id`);

ALTER TABLE `rendelestops` ADD FOREIGN KEY (`rendelesId`) REFERENCES `rendeles` (`id`);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`userName`) REFERENCES `users` (`name`);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`userPhonenumber`) REFERENCES `users` (`phonenumber`);

ALTER TABLE `addresses` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `rendeles` ADD FOREIGN KEY (`address`) REFERENCES `addresses` (`rendelesAddress`);
