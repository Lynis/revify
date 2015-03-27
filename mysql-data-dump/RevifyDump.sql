CREATE DATABASE  IF NOT EXISTS `revify` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `revify`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: revify
-- ------------------------------------------------------
-- Server version	5.6.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `icon` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('images/camera-icon.png',1,'Camera'),('images/laptop-icon.png',2,'Laptop'),('images/phone-icon.png',3,'Cell Phone'),('images/tv-icon.png',4,'TV'),('images/book-icon.png',5,'Books'),('images/car-icon.png',6,'Cars'),('images/tablet-icon.png',7,'Tablet'),('images/toy-icon.png',8,'Toys'),('images/watch-icon.png',9,'Watch'),('images/shoe-icon.png',10,'Shoes');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feature` (
  `feature_id` bigint(20) NOT NULL,
  `feature_name` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`feature_id`),
  KEY `FK_l9jwj9o9o7ue1je32nb6ijghq` (`category_id`),
  CONSTRAINT `FK_l9jwj9o9o7ue1je32nb6ijghq` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature_review`
--

DROP TABLE IF EXISTS `feature_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feature_review` (
  `feature_review_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rating` int(11) DEFAULT NULL,
  `feature_id` bigint(20) NOT NULL,
  `product_review_id` bigint(20) NOT NULL,
  PRIMARY KEY (`feature_review_id`),
  KEY `FK_a18etco6vp5heypsoqrvkai95` (`feature_id`),
  KEY `FK_hk156clcquhvckt9isii0sft7` (`product_review_id`),
  CONSTRAINT `FK_a18etco6vp5heypsoqrvkai95` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`),
  CONSTRAINT `FK_hk156clcquhvckt9isii0sft7` FOREIGN KEY (`product_review_id`) REFERENCES `product_review` (`product_review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_review`
--

LOCK TABLES `feature_review` WRITE;
/*!40000 ALTER TABLE `feature_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_review`
--

DROP TABLE IF EXISTS `product_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_review` (
  `product_review_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `overall_rating` int(11) DEFAULT NULL,
  `review_date` timestamp NULL DEFAULT NULL,
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`product_review_id`),
  KEY `FK_hkyxlio8psyrs6biegu21rgto` (`user_id`),
  KEY `FK_3jj4m8cx6b30ur3h817wi6npj` (`product_id`,`user_id`),
  CONSTRAINT `FK_3jj4m8cx6b30ur3h817wi6npj` FOREIGN KEY (`product_id`, `user_id`) REFERENCES `purchased_product_user` (`product_id`, `user_id`),
  CONSTRAINT `FK_59pjh8ssspqs6yypt6kqxtb8r` FOREIGN KEY (`product_id`) REFERENCES `purchased_product` (`product_id`),
  CONSTRAINT `FK_hkyxlio8psyrs6biegu21rgto` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_review`
--

LOCK TABLES `product_review` WRITE;
/*!40000 ALTER TABLE `product_review` DISABLE KEYS */;
INSERT INTO `product_review` VALUES (1,4,'2015-03-23 08:30:00','1','1'),(2,3,'2015-03-23 09:30:00','4','1'),(3,3,'2015-03-24 10:06:00','8','6'),(4,2,'2015-03-24 10:06:00','2','2'),(5,3,'2015-03-24 10:06:00','3','2'),(6,3,'2015-03-24 10:12:00','5','3'),(7,4,'2015-03-24 10:12:00','6','4'),(8,2,'2015-03-24 10:12:00','7','5');
/*!40000 ALTER TABLE `product_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchased_product`
--

DROP TABLE IF EXISTS `purchased_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased_product` (
  `product_id` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_3u8o5y01r1cln5abec6lc8l8n` (`category_id`),
  CONSTRAINT `FK_3u8o5y01r1cln5abec6lc8l8n` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_product`
--

LOCK TABLES `purchased_product` WRITE;
/*!40000 ALTER TABLE `purchased_product` DISABLE KEYS */;
INSERT INTO `purchased_product` VALUES ('1','images/products/olympus-zoom.jpg',449.99,'Olympus 24x Zoom Camera',1),('2','images/products/nikon-d7200.jpg',1129.99,'Nikon D7200',1),('3','images/products/iphone6-plus.jpg',249.99,'Apple iPhone 6 Plus',3),('4','images/products/samsung-galaxy-s5.jpg',29.99,'Samsung Galaxy S5',3),('5','images/products/nokia-lumia635.jpg',46.99,'Nokia Lumia 635',3),('6','images/products/htc-desire816.jpg',179.99,'HTC Desire 816',3),('7','images/products/canon-powershot-sx500.jpg',75,'Canon Powershot SX 500',1),('8','images/products/gopro-hero4.jpg',329,'GoPro HERO4',1);
/*!40000 ALTER TABLE `purchased_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchased_product_user`
--

DROP TABLE IF EXISTS `purchased_product_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased_product_user` (
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_product_id` varchar(255) DEFAULT NULL,
  `user_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`user_id`),
  KEY `FK_eqlvm2985dve00rvi34dr8jtj` (`product_product_id`),
  KEY `FK_4s9wt4lgymnxlnidtft67r3l1` (`user_user_id`),
  CONSTRAINT `FK_4s9wt4lgymnxlnidtft67r3l1` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_eqlvm2985dve00rvi34dr8jtj` FOREIGN KEY (`product_product_id`) REFERENCES `purchased_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_product_user`
--

LOCK TABLES `purchased_product_user` WRITE;
/*!40000 ALTER TABLE `purchased_product_user` DISABLE KEYS */;
INSERT INTO `purchased_product_user` VALUES ('1 ','1','1','1'),('1','2','1','2'),('2','1','2','1'),('2','2','2','2'),('3','1','3','1'),('3','2','3','2'),('4','1','4','1'),('4','2','4','2'),('5','3','5','3'),('6','4','6','4'),('7','5','7','5'),('8','6','8','6');
/*!40000 ALTER TABLE `purchased_product_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1'),('2'),('3'),('4'),('5'),('6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-25 15:18:57
