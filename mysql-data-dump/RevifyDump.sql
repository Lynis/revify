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
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('images/icons/camera-icon.png',1,'Digital Cameras'),('images/icons/laptop-icon.png',2,'Laptop'),('images/icons/phone-icon.png',3,'Cell Phones & Smartphones'),('images/icons/tv-icon.png',4,'TV'),('images/icons/tablet-icon.png',7,'Tablet'),('images/icons/toy-icon.png',8,'Toys'),('images/icons/watch-icon.png',9,'Wristwatches'),('images/icons/shoe-icon.png',10,'Shoes');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` VALUES (1,'Lens',NULL,1),(2,'Shutter Speed',NULL,1),(3,'Display',NULL,1);
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `feature_review`
--

LOCK TABLES `feature_review` WRITE;
/*!40000 ALTER TABLE `feature_review` DISABLE KEYS */;
INSERT INTO `feature_review` VALUES (1,1,1,1),(2,2,2,1),(3,3,3,1),(4,4,1,4),(5,5,2,4),(6,4,3,4),(7,3,1,3),(8,3,1,8),(9,4,2,3),(10,3,2,8),(11,2,1,9),(12,3,2,9),(13,4,3,9);
/*!40000 ALTER TABLE `feature_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_review`
--

LOCK TABLES `product_review` WRITE;
/*!40000 ALTER TABLE `product_review` DISABLE KEYS */;
INSERT INTO `product_review` VALUES (1,4,'2015-04-23 08:30:00','1','1'),(2,3,'2015-04-23 09:30:00','4','1'),(3,3,'2015-04-24 10:06:00','8','6'),(4,2,'2015-04-24 10:06:00','2','2'),(5,3,'2015-04-24 10:06:00','3','2'),(6,3,'2015-04-24 10:12:00','5','3'),(7,4,'2015-04-24 10:12:00','6','4'),(8,2,'2015-04-24 10:12:00','7','5'),(9,4,'2015-04-24 10:12:00','1','1');
/*!40000 ALTER TABLE `product_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchased_product`
--

LOCK TABLES `purchased_product` WRITE;
/*!40000 ALTER TABLE `purchased_product` DISABLE KEYS */;
INSERT INTO `purchased_product` VALUES ('013803229820','http://i.ebayimg.com/00/z/V~kAAOxyJU1SNI9d/$T2eC16ZHJGEFFm-5brogBSNI9c,7+w~~_7.JPG?set_id=89040003C1',240,'Canon PowerShot G16 12.1 MP Digital Camera - Black',1),('018208015191','http://i.ebayimg.com/00/z/WxoAAOxyRNJSb-of/$T2eC16Z,!)!FIdU)K)f,BSb-ofR8qg~~_7.JPG?set_id=89040003C1',88,'Nikon D D5300 24.2 MP Digital SLR Camera - Black (Body only) (Latest Model)',1),('027242862319','http://i.ebayimg.com/00/$(KGrHqFHJFYFD1bLi!J+BR!Vc!c2MQ~~_7.JPG?set_id=89040003C1',10,'Sony Cyber-shot DSC-TF1 16.1 MP Digital Camera - Red (Latest Model)',1),('1','images/products/olympus-zoom.jpg',449.99,'Olympus 24x Zoom Camera',1),('2','images/products/nikon-d7200.jpg',1129.99,'Nikon D7200',1),('3','images/products/iphone6-plus.jpg',249.99,'Apple iPhone 6 Plus',3),('4','images/products/samsung-galaxy-s5.jpg',29.99,'Samsung Galaxy S5',3),('4718487630424','http://i.ebayimg.com/00/$T2eC16JHJHwE9n8igtftBRdpRRFv,!~~_7.JPG?set_id=89040003C1',149.99,'HTC One M7 - 32GB - Black (Unlocked) Smartphone',3),('5','images/products/nokia-lumia635.jpg',46.99,'Nokia Lumia 635',3),('6','images/products/htc-desire816.jpg',179.99,'HTC Desire 816',3),('610214632074','http://i.ebayimg.com/00/s/MzA2WDI1Nw==/z/z6oAAOSwDk5UBzYk/$_7.JPG?set_id=89040003C1',29.99,'Nokia Lumia 521 - 8GB - White (T-Mobile) Smartphone',3),('7','images/products/canon-powershot-sx500.jpg',75,'Canon Powershot SX 500',1),('8','images/products/gopro-hero4.jpg',329,'GoPro HERO4',1),('8714574610665','http://i.ebayimg.com/00/$(KGrHqZHJBQFIHyJOg,ZBSHqZpj9T!~~_7.JPG?set_id=89040003C1',980,'Canon EOS 70D 20.2 MP Digital SLR Camera - Black (Kit w/ EF-S IS STM 18-55mm',1);
/*!40000 ALTER TABLE `purchased_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchased_product_user`
--

LOCK TABLES `purchased_product_user` WRITE;
/*!40000 ALTER TABLE `purchased_product_user` DISABLE KEYS */;
INSERT INTO `purchased_product_user` VALUES ('013803229820','testuser_revify_vijaya','013803229820','testuser_revify_vijaya'),('018208015191','testuser_vijayakedar','018208015191','testuser_vijayakedar'),('027242862319','testuser_vijayakedar','027242862319','testuser_vijayakedar'),('1 ','1','1','1'),('1','2','1','2'),('2','1','2','1'),('2','2','2','2'),('3','1','3','1'),('3','2','3','2'),('4','1','4','1'),('4','2','4','2'),('4718487630424','testuser_revify_vijaya','4718487630424','testuser_revify_vijaya'),('5','3','5','3'),('6','4','6','4'),('610214632074','testuser_revify_vijaya','610214632074','testuser_revify_vijaya'),('7','5','7','5'),('8','6','8','6'),('8714574610665','testuser_revify_vijaya','8714574610665','testuser_revify_vijaya');
/*!40000 ALTER TABLE `purchased_product_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1',0),('2',0),('3',0),('4',0),('5',0),('6',0),('testuser_revify_vijaya',0),('testuser_vijayakedar',0);
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

-- Dump completed on 2015-05-05  0:51:31
