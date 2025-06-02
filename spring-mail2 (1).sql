-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 02, 2025 at 09:00 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spring-mail2`
--

-- --------------------------------------------------------

--
-- Table structure for table `avis`
--

DROP TABLE IF EXISTS `avis`;
CREATE TABLE IF NOT EXISTS `avis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `rate` int NOT NULL,
  `delivery_man_id` int NOT NULL,
  `order_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsgnitbt096qfsu87pug6cjlgy` (`delivery_man_id`),
  KEY `FKmu93i14q5g2vsdbs6y1uyadcw` (`order_id`),
  KEY `FKjm7ew4okgyb6nrqslyuivx9w7` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `magazin_id` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKns1u5hggokk83277lxx6f2fb9` (`magazin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `created_at`, `name`, `magazin_id`, `updated_at`) VALUES
(4, '2025-06-01 13:33:35.930509', 'Electronics', 8, '2025-06-01 13:33:45.581607'),
(5, '2025-06-01 13:33:52.035968', 'Electronics 2', 8, '2025-06-01 13:33:52.035968');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE IF NOT EXISTS `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1t68827l97cwyxo9r1u6t4p7d` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `created_at`, `name`, `updated_at`) VALUES
(1, '2025-01-13 16:19:47.020651', 'IT Departmenddddt', '2025-01-13 16:19:47.020651');

-- --------------------------------------------------------

--
-- Table structure for table `earning`
--

DROP TABLE IF EXISTS `earning`;
CREATE TABLE IF NOT EXISTS `earning` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_commission` decimal(10,2) NOT NULL,
  `commission_rate` decimal(5,4) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `magazin_profit` decimal(10,2) NOT NULL,
  `paid_to_admin` decimal(10,2) NOT NULL,
  `remaining_debt` decimal(10,2) NOT NULL,
  `total_earnings` decimal(10,2) NOT NULL,
  `total_orders` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `magazin_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2k2o2sq4g42c1kepjpirkx8fa` (`magazin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `earning`
--

INSERT INTO `earning` (`id`, `admin_commission`, `commission_rate`, `created_at`, `magazin_profit`, `paid_to_admin`, `remaining_debt`, `total_earnings`, `total_orders`, `updated_at`, `magazin_id`) VALUES
(7, 0.00, 0.1000, '2025-06-01 13:20:44.632536', 0.00, 0.00, 0.00, 0.00, 0, '2025-06-01 13:20:44.632536', 7),
(8, 0.00, 0.1000, '2025-06-01 13:20:44.652252', 0.00, 0.00, 0.00, 0.00, 0, '2025-06-01 13:20:44.652252', 8);

-- --------------------------------------------------------

--
-- Table structure for table `email`
--

DROP TABLE IF EXISTS `email`;
CREATE TABLE IF NOT EXISTS `email` (
  `id` int NOT NULL AUTO_INCREMENT,
  `body` text,
  `sent_at` datetime(6) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `reply_to_id` int DEFAULT NULL,
  `sender_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3xftkf0pomol9kekg7nswy7jk` (`reply_to_id`),
  KEY `FKt98598pgiqdq5eifpddwo308m` (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_attachments`
--

DROP TABLE IF EXISTS `email_attachments`;
CREATE TABLE IF NOT EXISTS `email_attachments` (
  `email_id` int NOT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  KEY `FKlhs64qdbhugwo0i705cvam6px` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `email_recipients`
--

DROP TABLE IF EXISTS `email_recipients`;
CREATE TABLE IF NOT EXISTS `email_recipients` (
  `email_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  KEY `FKb4ofdwywrboer8ppic8r3xtox` (`recipient_id`),
  KEY `FK4q2dbubapfpy02m4h3b8ll3hi` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `generate_settings`
--

DROP TABLE IF EXISTS `generate_settings`;
CREATE TABLE IF NOT EXISTS `generate_settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `label` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `value` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `generate_settings`
--

INSERT INTO `generate_settings` (`id`, `created_at`, `label`, `updated_at`, `value`) VALUES
(1, '2025-06-01 13:07:34.748161', 'commission_rate', '2025-06-01 13:07:34.748161', '10');

-- --------------------------------------------------------

--
-- Table structure for table `magazin`
--

DROP TABLE IF EXISTS `magazin`;
CREATE TABLE IF NOT EXISTS `magazin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1t4itiyymfoc5ljhi9qg9kib3` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `magazin`
--

INSERT INTO `magazin` (`id`, `created_at`, `name`, `updated_at`, `user_id`, `address`, `description`, `image`) VALUES
(7, '2025-06-01 13:19:45.631188', 'STORE2', '2025-06-01 13:19:45.631188', 12, 'Tunisie', 'SDDSDSDS', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1748780385/r5dvhafbxtmsyeqjfirp.jpg'),
(8, '2025-06-01 13:20:31.260384', 'STORE1', '2025-06-01 13:20:31.260384', 11, 'Tunisie', 'DESC STORE 1', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1748780430/pdszkibkk8zhbijasb85.webp');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `delivery_fee` decimal(38,2) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `total_priceht` decimal(38,2) DEFAULT NULL,
  `total_pricettc` decimal(38,2) DEFAULT NULL,
  `total_vat_amount` decimal(38,2) DEFAULT NULL,
  `delivery_man_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `otp_generated_at` datetime(6) DEFAULT NULL,
  `otp_payment` varchar(6) DEFAULT NULL,
  `payment_verified` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FKrpyl2ov21xxrsaonynnk7yxfe` (`delivery_man_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `delivery_fee`, `order_date`, `status`, `total_priceht`, `total_pricettc`, `total_vat_amount`, `delivery_man_id`, `user_id`, `otp_generated_at`, `otp_payment`, `payment_verified`) VALUES
(6, NULL, '2025-06-01 13:40:19.361747', 1, 1000.00, 20000.00, 19000.00, NULL, 13, NULL, NULL, 0),
(7, NULL, '2025-06-01 13:40:21.921636', 1, 6500.00, 136500.00, 130000.00, NULL, 13, '2025-06-01 13:40:59.670759', '580579', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_line`
--

DROP TABLE IF EXISTS `order_line`;
CREATE TABLE IF NOT EXISTS `order_line` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `total_priceht` decimal(38,2) DEFAULT NULL,
  `total_pricettc` decimal(38,2) DEFAULT NULL,
  `total_vat_amount` decimal(38,2) DEFAULT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKk9f9t1tmkbq5w27u8rrjbxxg6` (`order_id`),
  KEY `FKpf904tci8garypkvm32cqupye` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_line`
--

INSERT INTO `order_line` (`id`, `quantity`, `total_priceht`, `total_pricettc`, `total_vat_amount`, `order_id`, `product_id`) VALUES
(4, 2, 1000.00, 20000.00, 19000.00, 6, 5),
(5, 5, 6500.00, 136500.00, 130000.00, 7, 6);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `payment_date` datetime(6) NOT NULL,
  `magazin_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhix1e4ebgxmj31kok41jq1gdf` (`magazin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_2ojme20jpga3r4r79tdso17gi` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `tva` decimal(5,2) NOT NULL,
  `category_id` int DEFAULT NULL,
  `magazin_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  KEY `FKj2u14qh3565i66tet1wlt7xnq` (`magazin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `description`, `image_path`, `name`, `price`, `tva`, `category_id`, `magazin_id`, `created_at`, `updated_at`) VALUES
(5, 'SSSD', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1748781418/gu2nkm6sgcdyvzsnrnsr.png', 'SDSD', 500.00, 19.00, 4, 8, '2025-06-01 13:36:59', '2025-06-01 13:36:59'),
(6, 'SDSDS', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1748781452/jmaps952blsxajfise6r.png', 'SDSD', 1300.00, 20.00, 5, 8, '2025-06-01 13:37:22', '2025-06-01 13:37:33');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_8sewwnpamngi6b1dwaa88askk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `created_at`, `name`, `updated_at`) VALUES
(1, '2025-01-13 15:58:30.224974', 'ADMIN', '2025-01-13 15:58:30.224974'),
(2, '2025-05-25 14:45:27.239424', 'STORE', '2025-05-25 14:45:27.239424'),
(3, '2025-05-25 14:45:35.100726', 'CLIENT', '2025-05-25 14:45:35.100726');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE IF NOT EXISTS `role_permission` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  KEY `FKf8yllw1ecvwqy3ehyxawqa1qp` (`permission_id`),
  KEY `FKa6jx8n8xkesmjmv6jqug6bg68` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `connection_otp` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `role_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`),
  KEY `FKgkh2fko1e4ydv1y6vtrwdc6my` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `address`, `birthday`, `connection_otp`, `email`, `first_name`, `image_path`, `last_name`, `otp`, `password`, `phone`, `status`, `role_id`, `department_id`) VALUES
(10, NULL, NULL, 1, 'wiemslimi38@gmail.com', 'admin', NULL, 'admin', NULL, '$2a$10$aXWtOJpyhcXqCds7aWkkWutI4xRe4FINZBmSfWb.Ardn0.aqVwHoq', NULL, 1, 1, NULL),
(11, 'Hedi newira', '2021-06-08', 1, 'islemslimi10@gmail.com', 'STOR 1', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1729759186/uiezd5rg5lls97v4bf7p.png', 'store 1', '177163', '$2a$10$aXWtOJpyhcXqCds7aWkkWutI4xRe4FINZBmSfWb.Ardn0.aqVwHoq', '20123456', 1, 2, NULL),
(12, '20 Mars Sidi Hassine', '2020-12-28', 1, 'iselm4842@gmail.com', 'STORE 2', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1729759186/uiezd5rg5lls97v4bf7p.png', 'USER', NULL, '$2a$10$aXWtOJpyhcXqCds7aWkkWutI4xRe4FINZBmSfWb.Ardn0.aqVwHoq', '20876543', 1, 2, NULL),
(13, 'Tunisie', '1999-01-01', 0, 'chigamouadh0@gmail.com\n', 'CLIENT', 'http://res.cloudinary.com/dzdsxiaeb/image/upload/v1729759186/uiezd5rg5lls97v4bf7p.png', 'CLIENT', NULL, '$2a$10$aXWtOJpyhcXqCds7aWkkWutI4xRe4FINZBmSfWb.Ardn0.aqVwHoq', '90229844', 1, 3, NULL);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `FKjm7ew4okgyb6nrqslyuivx9w7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKmu93i14q5g2vsdbs6y1uyadcw` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FKsgnitbt096qfsu87pug6cjlgy` FOREIGN KEY (`delivery_man_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FKns1u5hggokk83277lxx6f2fb9` FOREIGN KEY (`magazin_id`) REFERENCES `magazin` (`id`);

--
-- Constraints for table `earning`
--
ALTER TABLE `earning`
  ADD CONSTRAINT `FK2k2o2sq4g42c1kepjpirkx8fa` FOREIGN KEY (`magazin_id`) REFERENCES `magazin` (`id`);

--
-- Constraints for table `email`
--
ALTER TABLE `email`
  ADD CONSTRAINT `FK3xftkf0pomol9kekg7nswy7jk` FOREIGN KEY (`reply_to_id`) REFERENCES `email` (`id`),
  ADD CONSTRAINT `FKt98598pgiqdq5eifpddwo308m` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `email_attachments`
--
ALTER TABLE `email_attachments`
  ADD CONSTRAINT `FKlhs64qdbhugwo0i705cvam6px` FOREIGN KEY (`email_id`) REFERENCES `email` (`id`);

--
-- Constraints for table `email_recipients`
--
ALTER TABLE `email_recipients`
  ADD CONSTRAINT `FK4q2dbubapfpy02m4h3b8ll3hi` FOREIGN KEY (`email_id`) REFERENCES `email` (`id`),
  ADD CONSTRAINT `FKb4ofdwywrboer8ppic8r3xtox` FOREIGN KEY (`recipient_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `magazin`
--
ALTER TABLE `magazin`
  ADD CONSTRAINT `FK1t4itiyymfoc5ljhi9qg9kib3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKrpyl2ov21xxrsaonynnk7yxfe` FOREIGN KEY (`delivery_man_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `order_line`
--
ALTER TABLE `order_line`
  ADD CONSTRAINT `FKk9f9t1tmkbq5w27u8rrjbxxg6` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FKpf904tci8garypkvm32cqupye` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FKhix1e4ebgxmj31kok41jq1gdf` FOREIGN KEY (`magazin_id`) REFERENCES `magazin` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKj2u14qh3565i66tet1wlt7xnq` FOREIGN KEY (`magazin_id`) REFERENCES `magazin` (`id`);

--
-- Constraints for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FKf8yllw1ecvwqy3ehyxawqa1qp` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKgkh2fko1e4ydv1y6vtrwdc6my` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
