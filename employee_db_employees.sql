DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `empId` varchar(50) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `project` varchar(100) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `empId` (`empId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `employees` WRITE;
INSERT INTO `employees` VALUES (2,'RagulDravid','23456789','Design','Design Lead','Car Rental','Office','Permanent','2026-03-03 19:45:30','/uploads/1772567130469-ragul3.jpeg'),(7,'Selvakumar R','234567895','Design','Design Lead','House Rental','Remote','Probation','2026-03-03 20:24:44','/uploads/1772569484777-Top.JPG'),(10,'Vicknesh Kanna','234567898','Development','QA Tester','Solar Yield','Hybrid','Contract','2026-03-03 20:33:45','/uploads/1772570025049-Rahaalog.JPG');
UNLOCK TABLES;
