CREATE DATABASE IF NOT EXISTS `pollakpizza` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `pollakpizza`;
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 31. 08:37
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `pollakpizza`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `pizzaId` int(11) DEFAULT NULL,
  `pizzaNum` int(11) DEFAULT NULL,
  `sizeId` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `userPhone` varchar(50) DEFAULT NULL,
  `finalPrice` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ordertops`
--

CREATE TABLE `ordertops` (
  `orderId` int(11) DEFAULT NULL,
  `toppingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pizzas`
--

CREATE TABLE `pizzas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pizzas`
--

INSERT INTO `pizzas` (`id`, `name`, `price`, `image`) VALUES
(0, 'Egyedi Pizza', 1000, 'src/assets/image/pizzas.jpg'),
(1, 'Margherita', 1000, 'src/assets/image/pizzas.jpg'),
(2, 'Pepperoni', 1200, 'src/assets/image/pizzas.jpg'),
(3, 'Hawaii', 1300, 'src/assets/image/pizzas.jpg'),
(4, 'Kukoricás', 1300, 'src/assets/image/pizzas.jpg'),
(5, 'Sonkás', 1300, 'src/assets/image/pizzas.jpg'),
(6, 'Kolbászos', 1300, 'src/assets/image/pizzas.jpg'),
(7, 'Baconos', 1300, 'src/assets/image/pizzas.jpg'),
(8, 'Sonkás-Gombás', 1300, 'src/assets/image/pizzas.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pizzatoppings`
--

CREATE TABLE `pizzatoppings` (
  `pizzaId` int(11) NOT NULL,
  `toppingId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `pizzatoppings`
--

INSERT INTO `pizzatoppings` (`pizzaId`, `toppingId`) VALUES
(1, 1),
(2, 1),
(2, 2),
(3, 1),
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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `size` int(11) DEFAULT NULL,
  `multiPrice` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `size`
--

INSERT INTO `size` (`id`, `size`, `multiPrice`) VALUES
(1, 32, 1.00),
(2, 36, 1.50),
(3, 42, 2.00),
(4, 60, 2.50);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `toppings`
--

CREATE TABLE `toppings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `bonusPrice` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `toppings`
--

INSERT INTO `toppings` (`id`, `name`, `bonusPrice`) VALUES
(1, 'Sajt', 200),
(2, 'Pepperoni', 300),
(3, 'Ananász', 250),
(4, 'Sonka', 300),
(5, 'Kukorica', 250),
(6, 'Kolbász', 250),
(7, 'Baconos', 250),
(8, 'Gomba', 250),
(9, 'Mozzarella', 250);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT NULL,
  `phonenumber` varchar(50) DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `birthdate`, `address`, `admin`, `phonenumber`, `resetPasswordToken`, `resetPasswordExpires`) VALUES
(2, 'admin', 'admin@admin', '$2b$10$wg8sc6Pb9bcfZQeBah.1j.YIcDvE20vs.OZK5DHq1O2WgUd3/vi2G', '2006-03-22', 'Admin', 1, '123123123123', NULL, NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `pizzaId` (`pizzaId`),
  ADD KEY `sizeId` (`sizeId`);

--
-- A tábla indexei `ordertops`
--
ALTER TABLE `ordertops`
  ADD KEY `orderId` (`orderId`),
  ADD KEY `toppingId` (`toppingId`);

--
-- A tábla indexei `pizzas`
--
ALTER TABLE `pizzas`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `pizzatoppings`
--
ALTER TABLE `pizzatoppings`
  ADD PRIMARY KEY (`pizzaId`,`toppingId`),
  ADD KEY `toppingId` (`toppingId`);

--
-- A tábla indexei `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `toppings`
--
ALTER TABLE `toppings`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `pizzas`
--
ALTER TABLE `pizzas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `toppings`
--
ALTER TABLE `toppings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`pizzaId`) REFERENCES `pizzas` (`id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`sizeId`) REFERENCES `size` (`id`);

--
-- Megkötések a táblához `ordertops`
--
ALTER TABLE `ordertops`
  ADD CONSTRAINT `ordertops_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ordertops_ibfk_2` FOREIGN KEY (`toppingId`) REFERENCES `toppings` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `pizzatoppings`
--
ALTER TABLE `pizzatoppings`
  ADD CONSTRAINT `pizzatoppings_ibfk_1` FOREIGN KEY (`pizzaId`) REFERENCES `pizzas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pizzatoppings_ibfk_2` FOREIGN KEY (`toppingId`) REFERENCES `toppings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
