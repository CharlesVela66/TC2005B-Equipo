-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-goatech.alwaysdata.net
-- Generation Time: Apr 19, 2023 at 04:50 PM
-- Server version: 10.6.11-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goatech_onyx`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bitacora`
--

CREATE TABLE `bitacora` (
  `id_cliente` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha` date NOT NULL,
  `nivel_satisf` int(2) DEFAULT NULL,
  `descripcion_sesion` varchar(1000) NOT NULL,
  `comentarios` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `bitacora`
--

INSERT INTO `bitacora` (`id_cliente`, `id_rutina`, `created_at`, `fecha`, `nivel_satisf`, `descripcion_sesion`, `comentarios`) VALUES
(21, 1, '2023-03-30 01:22:49', '2023-03-20', 5, 'Todo', 'No agregó comentarios'),
(21, 1, '2023-03-30 01:22:56', '2023-03-20', 1, 'Nada', 'No agregó comentarios'),
(21, 1, '2023-03-30 01:23:18', '2023-03-27', 1, 'Me gusto mucho lo que hice', 'No agregó comentarios'),
(21, 1, '2023-03-30 01:28:07', '2023-03-28', 4, 'Pierna', 'No agregó comentarios'),
(21, 1, '2023-03-30 01:28:46', '2023-03-29', NULL, 'Brazo', 'No agregó comentarios'),
(21, 1, '2023-04-17 19:07:54', '2023-04-17', 4, 'ramona', 'ramona'),
(21, 2, '2023-04-11 23:36:34', '2023-04-06', NULL, 'hombro', 'No agregó comentarios'),
(21, 3, '2023-04-12 19:01:27', '2023-04-10', 5, '4x10 Bicep Curl', 'Las pude hacer todas y termine muy cansado pero me senti muy bien'),
(21, 3, '2023-04-12 19:34:50', '2023-04-12', 4, 'Hola', 'Hola'),
(21, 3, '2023-04-12 19:38:17', '2023-04-12', 5, 'Hola2', 'Hola'),
(21, 33, '2023-04-12 19:00:27', '2023-04-07', 4, '5x5 Squats 100kg', 'Me senti bien '),
(25, 1, '2023-04-14 17:13:28', '0002-02-02', 1, 'nada', 'nada'),
(25, 1, '2023-04-17 04:16:03', '2023-03-28', NULL, 'btn', 'bmt');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_rutina` int(11) DEFAULT NULL,
  `id_dieta` int(11) DEFAULT NULL,
  `id_obj` int(11) DEFAULT NULL,
  `id_niv` int(11) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_usuario`, `id_rutina`, `id_dieta`, `id_obj`, `id_niv`, `sexo`, `fecha_nacimiento`) VALUES
(1, 1, 8, 5, 3, 1, NULL, '0000-00-00'),
(2, 1, 3, 8, 2, 3, NULL, '0000-00-00'),
(3, 1, 7, 6, 1, 4, NULL, '0000-00-00'),
(4, 1, 5, 3, 2, 2, NULL, '0000-00-00'),
(5, 1, 9, 4, 2, 2, NULL, '0000-00-00'),
(6, 1, 10, 9, 1, 3, NULL, '0000-00-00'),
(7, 1, 5, 1, 2, 1, NULL, '0000-00-00'),
(8, 1, 8, 7, 3, 1, NULL, '0000-00-00'),
(9, 1, 7, 10, 2, 3, NULL, '0000-00-00'),
(10, 1, 9, 6, 2, 4, NULL, '0000-00-00'),
(11, 1, 8, 7, 2, 3, NULL, '0000-00-00'),
(12, 1, 2, 1, 2, 1, NULL, '0000-00-00'),
(13, 1, 1, 9, 2, 3, NULL, '0000-00-00'),
(14, 1, 2, 2, 2, 2, NULL, '0000-00-00'),
(15, 1, 10, 10, 3, 4, NULL, '0000-00-00'),
(16, 1, 5, 5, 3, 1, NULL, '0000-00-00'),
(17, 1, 7, 6, 2, 1, NULL, '0000-00-00'),
(18, 1, 4, 5, 3, 4, NULL, '0000-00-00'),
(19, 1, 10, 5, 3, 3, NULL, '0000-00-00'),
(20, 1, 9, 6, 2, 4, NULL, '0000-00-00'),
(21, 25, 1, 1, 2, 4, NULL, '0000-00-00'),
(23, 34, NULL, NULL, 3, 3, NULL, '0000-00-00'),
(24, 35, 18, 1, 3, 3, NULL, '0000-00-00'),
(25, 36, 1, 2, 3, 3, NULL, '0000-00-00'),
(26, 37, NULL, NULL, 1, 2, NULL, '0000-00-00'),
(27, 38, NULL, NULL, 3, NULL, NULL, '0000-00-00'),
(28, 39, NULL, NULL, 1, NULL, NULL, '0000-00-00'),
(29, 40, NULL, NULL, 1, NULL, NULL, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `clientemedicion`
--

CREATE TABLE `clientemedicion` (
  `id_cliente` int(11) NOT NULL,
  `id_medicion` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `medida` float(4,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `clientemedicion`
--

INSERT INTO `clientemedicion` (`id_cliente`, `id_medicion`, `fecha`, `medida`) VALUES
(21, 1, '2023-03-24', 10.0),
(21, 1, '2023-03-28', 999.9),
(21, 1, '2023-03-29', 55.0),
(21, 1, '2023-03-31', 101.0),
(21, 1, '2023-04-12', 0.8),
(21, 1, '2023-04-14', 2.6),
(21, 2, '2023-03-24', 10.0),
(21, 2, '2023-03-29', 999.9),
(21, 2, '2023-04-14', 1.6),
(21, 3, '2023-03-24', 10.0),
(21, 3, '2023-03-28', 999.9),
(21, 3, '2023-03-29', 999.9),
(21, 4, '2023-03-24', 10.0),
(21, 4, '2023-03-28', 10.0),
(21, 4, '2023-03-29', 999.9),
(21, 4, '2023-04-12', 33.0),
(21, 4, '2023-04-17', 1.0),
(21, 5, '2023-03-24', 10.0),
(21, 5, '2023-03-29', 999.9),
(21, 6, '2023-03-24', 10.0),
(21, 6, '2023-03-29', 999.9),
(21, 6, '2023-04-12', 1.8),
(21, 7, '2023-03-24', 10.0),
(21, 7, '2023-03-29', 999.9),
(21, 7, '2023-04-12', 0.7),
(21, 8, '2023-03-24', 10.0),
(21, 8, '2023-03-29', 999.9),
(21, 9, '2023-03-24', 10.0),
(21, 9, '2023-03-29', 67.0),
(21, 10, '2023-03-24', 71.1),
(21, 10, '2023-03-29', 999.9),
(21, 10, '2023-04-12', 60.0),
(21, 11, '2023-03-24', 10.0),
(21, 11, '2023-03-29', 999.9),
(21, 11, '2023-04-12', 1.0),
(25, 1, '2023-03-28', 3.0),
(25, 1, '2023-03-29', 999.9),
(25, 1, '2023-03-30', 727.0),
(25, 2, '2023-03-28', 3.0),
(25, 2, '2023-03-30', 22.0),
(25, 3, '2023-03-28', 1.0),
(25, 3, '2023-03-30', 2.0),
(25, 3, '2023-04-16', 0.4),
(25, 4, '2023-03-28', 1.0),
(25, 4, '2023-03-29', 999.9),
(25, 4, '2023-04-18', 12.0),
(25, 5, '2023-03-28', 3.0),
(27, 1, '2023-03-30', 18.0),
(27, 1, '2023-04-13', 85.0),
(27, 2, '2023-03-30', 876.0),
(27, 2, '2023-04-13', 1.6),
(27, 3, '2023-03-30', 7.0),
(27, 3, '2023-04-13', 3.5),
(27, 4, '2023-03-30', 8.0),
(27, 4, '2023-04-13', 85.0),
(27, 5, '2023-03-30', 9.0),
(27, 6, '2023-03-30', 10.0),
(27, 7, '2023-03-30', 11.0),
(27, 7, '2023-04-13', 23.0),
(27, 8, '2023-03-30', 12.0),
(27, 9, '2023-03-30', 13.0),
(27, 10, '2023-03-30', 14.0),
(27, 11, '2023-03-30', 15.0);

-- --------------------------------------------------------

--
-- Table structure for table `dieta`
--

CREATE TABLE `dieta` (
  `id_dieta` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `tipo_dieta` varchar(15) NOT NULL,
  `id_macro` int(11) NOT NULL,
  `id_micro` int(11) NOT NULL,
  `Url_image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `dieta`
--

INSERT INTO `dieta` (`id_dieta`, `nombre`, `tipo_dieta`, `id_macro`, `id_micro`, `Url_image`) VALUES
(1, 'Rico pollo', 'Aumento peso', 1, 1, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(2, 'Pollo', 'Mantner peso', 6, 3, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(3, 'Ensalada Cesar', 'Bajar peso', 3, 10, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(4, 'Pescado', 'Mantener', 4, 12, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(5, 'Dieta detox', 'Ganar masa', 5, 8, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(6, 'Dieta Hipercalórica', 'Bajar peso', 7, 11, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(7, 'Dieta hipocalórica', 'Subir peso', 2, 2, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(8, 'Dieta Proteica', 'Ganar musculo', 5, 5, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(9, 'Equelibrada', 'Mantener peso', 2, 7, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(10, 'Dieta de Volumen', 'Aumentar peso', 5, 8, 'https://www.iocir.com/wp-content/uploads/2020/10/diet-food-PUD4BCL.jpg'),
(11, 'Hola', '', 11, 13, NULL),
(12, 'Saludoos', '', 19, 21, ''),
(13, 'agua', '', 20, 22, ''),
(14, 'cate', '', 21, 23, ''),
(15, 'Ramona', '', 22, 24, ''),
(16, 'daniel', '', 23, 25, ''),
(17, 'Chat Noir', '', 24, 26, ''),
(18, 'Gatito', '', 25, 27, ''),
(19, 'Efe', '', 26, 28, ''),
(20, 'Rico Pollo', '', 27, 29, ''),
(21, 'Rico Pollo', '', 28, 30, ''),
(22, 'Rico Pollo', '', 29, 31, ''),
(23, 'Pollo Pollo', '', 30, 32, ''),
(24, 'Pollo Pollo 2', '', 31, 33, ''),
(25, 'Pollo Pollo 3', '', 32, 34, ''),
(26, 'Pollo Pollo 4', '', 33, 35, '');

-- --------------------------------------------------------

--
-- Table structure for table `dietasalimentos`
--

CREATE TABLE `dietasalimentos` (
  `id_dietaalimento` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `medida` varchar(50) NOT NULL,
  `cantidad` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dietasalimentos`
--

INSERT INTO `dietasalimentos` (`id_dietaalimento`, `id_dieta`, `nombre`, `medida`, `cantidad`) VALUES
(1, 25, '', '', 0),
(2, 26, 'Pollo', 'Gramos', 1),
(3, 26, 'Pollo', 'Miligramos', 100),
(4, 26, 'Pollo', 'Kilogramos', 10);

-- --------------------------------------------------------

--
-- Table structure for table `dietasfavoritas`
--

CREATE TABLE `dietasfavoritas` (
  `id_cliente` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `dietasfavoritas`
--

INSERT INTO `dietasfavoritas` (`id_cliente`, `id_dieta`) VALUES
(1, 1),
(1, 3),
(2, 10),
(3, 4),
(4, 2),
(5, 9),
(6, 3),
(7, 10),
(8, 5),
(9, 6),
(10, 9),
(21, 2),
(21, 3);

-- --------------------------------------------------------

--
-- Table structure for table `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id_ejercicio` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `descripcion_ejercicio` varchar(240) NOT NULL,
  `video_ejercicio` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `ejercicio`
--

INSERT INTO `ejercicio` (`id_ejercicio`, `descripcion`, `descripcion_ejercicio`, `video_ejercicio`) VALUES
(1, 'Curt de bicep', '', 'Video demostrativo'),
(2, 'Lagartijas', '', 'Video demostrativo'),
(3, 'Abdominal', 'Ejercicio que trabaja la area', 'https://www.youtube.com/embed/WnoCFnIiQHw'),
(4, 'Remo', '', 'Video demostrativo'),
(5, 'Plancha', '', 'Video demostrativo'),
(6, 'Sentadillas', '', 'Video demostrativo'),
(7, 'Dominadas', '', 'Video demostrativo'),
(8, 'Press de pecho', '', 'Video demostrativo'),
(9, 'Martillos', '', 'Video demostrativo'),
(10, 'Elevaciones de piernas', '', 'Video demostrativo'),
(11, 'Caminadora', '', 'Video demostrativo'),
(12, 'Bicicleta de piso', '', 'Video demostrativo'),
(13, 'Extension de tricep', '', 'Video demostrativo'),
(14, 'Fondos', '', 'Video demostrativo'),
(15, 'Press Militar', '', 'Video demostrativo'),
(16, 'Peso Muerto', '', 'Video demostrativo'),
(17, 'Remo invertido', '', 'Video demostrativo'),
(18, 'Apertura de pecho', '', 'Video demostrativo'),
(19, 'Cristos', '', 'Video demostrativo'),
(20, 'Cruce de Polea', '', 'Video demostrativo'),
(21, 'sentar', '', 'Video demostrativo'),
(22, 'bulgarian split squad', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(107, 'Micheal', '', 'https://www.youtube.com/embed/n3qQtSRmHxo'),
(108, 'uidhdik', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(109, 'uidhxk', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(112, 'volar', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(128, 'oeuidhdiueoeuidbhmbxkjueoeuidhxikjueoeui', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(129, 'Ab', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(130, 'alo', 'ueuteonuhoetnuhtnoeuhnothnouhontuhneotuhntuhnotuhnuhonuonuhonthtnehuetunoebjbhobnebueothtnohutohuntountohutnohunthunto uthtnuheont uhontu oenhuneto ntoh ntoeh untoe untoeh unoeh unoeh untoehntoeunt oentuhentu otunt hunoth une unoh unote huo', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(131, 'al', 'uidh567', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(132, 'Squats', 'Sentar', 'https://www.youtube.com/embed/BjixzWEw4EY'),
(133, 'Squatss', 'sssue', 'https://www.youtube.com/embed/U7cGjV37rbk'),
(134, 'aaaaaaaa', 'aaaa', 'https://www.youtube.com/embed/WnoCFnIiQHw');

-- --------------------------------------------------------

--
-- Table structure for table `macronutrientes`
--

CREATE TABLE `macronutrientes` (
  `id_macro` int(11) NOT NULL,
  `calorias` int(7) NOT NULL,
  `proteinas` int(7) NOT NULL,
  `carbohidratos` int(7) NOT NULL,
  `grasas` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `macronutrientes`
--

INSERT INTO `macronutrientes` (`id_macro`, `calorias`, `proteinas`, `carbohidratos`, `grasas`) VALUES
(1, 2500, 342, 458, 580),
(2, 4346, 533, 5425, 23),
(3, 3324, 245, 24, 345),
(4, 1200, 544, 435, 234),
(5, 2353, 432, 343, 345),
(6, 3000, 534, 433, 345),
(7, 2000, 345, 345, 235),
(8, 53463, 35934, 59358, 43850),
(9, 0, 0, 0, 0),
(10, 438, 2485, 4403, 434),
(11, 0, 0, 0, 0),
(12, 0, 0, 0, 0),
(13, 1, 1, 1, 1),
(14, 1, 1, 1, 1),
(15, 1, 1, 1, 1),
(16, 1, 1, 1, 1),
(17, 1, 1, 1, 1),
(18, 0, 0, 0, 0),
(19, 0, 0, 0, 0),
(20, 0, 0, 0, 0),
(21, 0, 0, 0, 0),
(22, -20, -20, -20, -20),
(23, 0, 0, 0, 0),
(24, 492, 65, 468, 4694),
(25, 454, 654, 4687, 685),
(26, 2344, 4223, 422, 242),
(27, 0, 0, 0, 0),
(28, 0, 0, 0, 0),
(29, 0, 0, 0, 0),
(30, 0, 0, 0, 0),
(31, 0, 0, 0, 0),
(32, 0, 0, 0, 0),
(33, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `medicion`
--

CREATE TABLE `medicion` (
  `id_medicion` int(11) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `medicion`
--

INSERT INTO `medicion` (`id_medicion`, `tipo`) VALUES
(1, 'Cuello'),
(2, 'Pecho'),
(3, 'BrazoIzq'),
(4, 'BrazoDer'),
(5, 'Cintura'),
(6, 'PiernaIzq'),
(7, 'PiernaDer'),
(8, 'PantorrillaIzq'),
(9, 'PantorrillaDer'),
(10, 'Peso'),
(11, 'Cadera');

-- --------------------------------------------------------

--
-- Table structure for table `micronutrientes`
--

CREATE TABLE `micronutrientes` (
  `id_micro` int(11) NOT NULL,
  `ceniza` float(5,1) DEFAULT NULL,
  `fibra_total` float(5,1) DEFAULT NULL,
  `calcio` float(5,1) DEFAULT NULL,
  `fosforo` float(5,1) DEFAULT NULL,
  `hierro` float(5,1) DEFAULT NULL,
  `tiamina` float(5,1) DEFAULT NULL,
  `riboflavina` float(5,1) DEFAULT NULL,
  `niacina` float(5,1) DEFAULT NULL,
  `vit_c` float(5,1) DEFAULT NULL,
  `vit_a` float(5,1) DEFAULT NULL,
  `acgrasosmin` float(5,1) DEFAULT NULL,
  `acgrasospoli` float(5,1) DEFAULT NULL,
  `acgrasossat` float(5,1) DEFAULT NULL,
  `colesterol` float(5,1) DEFAULT NULL,
  `potasio` float(5,1) DEFAULT NULL,
  `sodio` float(5,1) DEFAULT NULL,
  `zinc` float(5,1) DEFAULT NULL,
  `magnesio` float(5,1) DEFAULT NULL,
  `vit_b6` float(5,1) DEFAULT NULL,
  `vit_b12` float(5,1) DEFAULT NULL,
  `acfolico` float(5,1) DEFAULT NULL,
  `folatoeq` float(5,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `micronutrientes`
--

INSERT INTO `micronutrientes` (`id_micro`, `ceniza`, `fibra_total`, `calcio`, `fosforo`, `hierro`, `tiamina`, `riboflavina`, `niacina`, `vit_c`, `vit_a`, `acgrasosmin`, `acgrasospoli`, `acgrasossat`, `colesterol`, `potasio`, `sodio`, `zinc`, `magnesio`, `vit_b6`, `vit_b12`, `acfolico`, `folatoeq`) VALUES
(1, 4523.1, 1253.1, 1234.2, 3728.3, 32.2, 123.2, 2.1, 3.0, 4.0, 9.2, 293.0, 345.2, 2352.0, 3552.2, 23.0, 2124.0, 2344.0, 21.0, 232.0, 6.0, 23.0, 24.0),
(2, 234.2, 312.0, 23.0, 56.0, 789.0, 847.3, 234.2, 2134.0, 234.2, 25.0, 493.0, 954.0, 34.3, 492.3, 4953.0, 2948.3, 244.4, 234.0, 34.0, 43.0, 54.0, 4.0),
(3, 234.2, 324.2, 2345.2, 345.0, 234.2, 35.2, 234.2, 345.2, 34.2, 345.2, 3521.3, 3.0, 352.2, 35.2, 76.3, 45.0, 67.4, 86.0, 53.4, 32.1, 34.0, 2.0),
(4, 234.2, 4324.3, 234.2, 2342.3, 234.2, 3452.3, 443.5, 20.1, 435.9, 542.3, 432.3, 342.5, 234.2, 345.3, 34.2, 10.5, 231.3, 12.3, 35.3, 235.2, 11.2, 54.2),
(5, 35.1, 17.7, 1482.4, 2156.4, 18.9, 1.4, 2.9, 23.7, 37.2, 2271.8, 27.0, 18.2, 28.9, 865.7, 3993.7, 1781.7, 16.1, 485.1, 2.2, 4.5, 389.3, 23.0),
(6, 35.0, 32.0, 54.0, 235.2, 324.2, 23.2, 35.0, 67.0, 43.2, 6563.0, 35.3, 45.3, 23.0, 23.0, 54.0, 54.0, 34.0, 23.0, 65.0, 34.0, 4.3, 543.3),
(7, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0),
(8, 34.2, 43.7, 34.6, 3.5, 34.5, 3.4, 443.5, 4.0, NULL, NULL, 34.0, NULL, 234.0, NULL, 234.4, 424.5, NULL, 53.2, 98.3, 20.0, 21.0, 22.0),
(9, NULL, 345.2, NULL, 9.4, 10.4, 54.3, 76.7, 23.5, 65.4, 90.4, 3.2, 4.4, 6.6, 7.7, 8.8, 9.9, 21.4, 67.7, 45.7, 23.4, 56.7, 45.0),
(10, 9.3, 23.5, 345.4, 332.5, 366.3, 36.9, 43.0, 54.2, 43.6, 347.8, 34.0, 65.8, 346.0, 45.3, 656.3, 545.3, 45.5, 43.0, 75.9, 45.3, 2.1, 54.9),
(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0),
(13, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(14, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(15, 1.0, 11.0, 1.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0),
(16, 1.0, 11.0, 1.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0),
(17, 1.0, 11.0, 1.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0),
(18, 1.0, 11.0, 1.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0),
(19, 1.0, 11.0, 1.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0),
(20, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(21, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(22, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(23, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(24, -20.0, -20.0, -20.0, -20.0, -20.0, -20.0, -20.0, -20.0, -20.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(26, 0.3, 0.6, 0.6, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 2.5, 0.4, 0.0, 0.3, 0.2, 1.0, 0.0),
(27, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.4, 0.3, 0.3),
(28, 0.3, 0.5, 0.5, 0.4, 0.4, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
(29, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1),
(30, 0.1, 0.0, 0.1, 0.1, 0.1, 0.0, 0.0, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1),
(31, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1),
(32, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1),
(33, 0.1, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.0, 0.0, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1),
(34, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.0, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1),
(35, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1, 0.0, 0.0, 0.1, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1, 0.0, 0.1, 0.1);

-- --------------------------------------------------------

--
-- Table structure for table `nivelfisico`
--

CREATE TABLE `nivelfisico` (
  `id_niv` int(11) NOT NULL,
  `nombre_niv` varchar(20) DEFAULT NULL,
  `descripcion_niv` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `nivelfisico`
--

INSERT INTO `nivelfisico` (`id_niv`, `nombre_niv`, `descripcion_niv`) VALUES
(1, 'Noob', 'Hace menos de 12 repeticiones,no sabe técnica'),
(2, 'Beginner', 'Ya realiza 12 repeticiones'),
(3, 'Intermediate', 'Realiza 12 repeticiones con pesos fuertes,buena técnica'),
(4, 'Advanced', 'Pesos pesados con buena técnica');

-- --------------------------------------------------------

--
-- Table structure for table `objetivo`
--

CREATE TABLE `objetivo` (
  `id_obj` int(11) NOT NULL,
  `nombre_obj` varchar(20) DEFAULT NULL,
  `descripcion_obj` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `objetivo`
--

INSERT INTO `objetivo` (`id_obj`, `nombre_obj`, `descripcion_obj`) VALUES
(1, 'Bajar peso', 'Adelgaza y tonifica cuerpo'),
(2, 'Mantener peso', 'Se mantiene el peso, pero genera musculo'),
(3, 'Subir peso', 'Dieta rica en carbohidratos y calorías para subir el peso');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre`, `descripcion`) VALUES
(1, 'Cliente', 'Usa la aplicación para poder alcanzar su meta en su vida fitness'),
(2, 'Administrador', 'Gestiona la aplicación y asigna roles');

-- --------------------------------------------------------

--
-- Table structure for table `rutina`
--

CREATE TABLE `rutina` (
  `id_rutina` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `tiporutina` varchar(25) NOT NULL,
  `descripcion` text NOT NULL,
  `URL_Image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rutina`
--

INSERT INTO `rutina` (`id_rutina`, `nombre`, `tiporutina`, `descripcion`, `URL_Image`) VALUES
(1, 'pecho_explosivo', 'pecho', 'Realizar un fuerte entrenamiento de pecho', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(2, 'Pierna_tonifcar', 'Pierna', 'realizar un leve entrenamiento', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(3, 'Bicep_cara', 'bicep', 'Realizar entrenamiento de fuerza con mancuernas', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(4, 'Pecho Alto', 'Pecho', 'Realizar entrenamiento de fuerza con barra', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(5, 'Pecho Medio', 'Pecho', 'Realizar entrenamiento de progresión', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(6, 'Pecho Bajo', 'Pecho', 'Realizar entrenamiento de fuerza con poleas', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(7, 'Tricep y Bicep', 'Tricep-bicep', 'Realizar entrenamiento de fuerza con mancuernas', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(8, 'Espalda y hombro', 'Espalda', 'Realizar entrenamiento de fuerza con mancuernas', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(9, 'Pecho y hombro', 'P y H', 'Aumento de fuerza', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(10, 'Espalda Baja', 'Espalda', 'Tonificar musculos bajos', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
(11, 'Prueba 1', '', '', ''),
(12, 'Hola', 'Hola', '', ''),
(13, 'Abdominales Max', 'Subir Peso', 'Esta muy padre para abdomen', ''),
(14, 'Prueba Nueva', 'afasdf', 'agdsag', ''),
(15, 'Nueva Rutina', 'Bajar Peso', 'Hola', ''),
(16, 'Definitiva', 'Hola', 'Hola', ''),
(17, '', '', '', ''),
(18, '', '', '', ''),
(19, 'Abdominales Hasta Morir', '', '', ''),
(20, 'hola', '', '', ''),
(21, 'Hola', '', 'Hola', ''),
(22, 'Saludos', 'Bajar de Peso', 'saludos', ''),
(23, 'Subir', 'Subir de Peso', 'Subir', ''),
(24, 'Mantener', 'Mantener Peso', 'Mantener', ''),
(25, 'Doppio', 'Mantener Peso', 'Doppio', ''),
(26, 'Carlos', 'Mantener Peso', 'Carlos', ''),
(27, 'Charlie', 'Subir de Peso', 'Charlie', ''),
(28, 'Lagartijas Every Day', 'Subir de Peso', 'Lagartijas hasta que te canses de hacerlas porque sí', ''),
(29, 'Push Ups Every Day', 'Subir de Peso', 'Lagartijas hasta que ya no quieras', ''),
(30, 'Mi Rutina', 'Mantener Peso', 'Mi Rutina', ''),
(31, 'Mi Nueva Rutina', 'Mantener Peso', 'Mi Nueva Rutina', ''),
(32, 'Mi Nueva Nueva Rutina', 'Mantener Peso', 'Yes', ''),
(33, 'Mi NUeva Nueva Nueva Nuev', 'Mantener Peso', 'Hola', '1680815030403-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(34, 'Carlitos', '', 'Carlitos', '1680899167153-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(35, 'Holis', '', 'Holis', '1680899456684-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(36, '2525', '', '25', '1680899539198-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(37, 'Hola', 'Bajar de Peso', 'Hola', '1680901104102-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(38, 'Hola', 'Bajar de Peso', 'Hola', '1680901466465-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(39, 'Carlitos', 'Subir de Peso', 'Carlitos', '1680901546358-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(40, 'Mi Rutina Loca', 'Mantener Peso', 'Rutina chida', '1680902521418-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(41, 'Sebas', 'Subir de Peso', 'Sebas', '1681142895437-download.jfif'),
(42, 'Rutina poderosa', 'Mantener Peso', 'Rutina donde vas a tener un cuerpower', '1681836183050-Cuerpower.jpg'),
(43, 'Rutina perrona', 'Subir de Peso', 'Aqui es donde se viene el super texto', '1681876938956-download (1).jfif');

-- --------------------------------------------------------

--
-- Table structure for table `rutinaejercicio`
--

CREATE TABLE `rutinaejercicio` (
  `id_rutinaejercicio` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rutinaejercicio`
--

INSERT INTO `rutinaejercicio` (`id_rutinaejercicio`, `id_rutina`, `id_ejercicio`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 1, 4),
(4, 1, 5),
(5, 1, 7),
(6, 2, 3),
(7, 2, 5),
(8, 2, 10),
(9, 3, 1),
(10, 3, 2),
(11, 3, 3),
(12, 3, 4),
(13, 4, 2),
(14, 4, 5),
(15, 5, 7),
(16, 5, 9),
(17, 6, 3),
(18, 6, 5),
(19, 6, 7),
(20, 7, 13),
(21, 7, 15),
(22, 7, 20),
(23, 8, 2),
(24, 8, 4),
(25, 8, 5),
(26, 9, 3),
(27, 9, 6),
(28, 10, 2),
(29, 10, 5),
(30, 10, 9),
(31, 25, 12),
(32, 25, 19),
(33, 26, 11),
(34, 27, 107),
(35, 28, 2),
(36, 29, 2),
(37, 30, 3),
(38, 31, 3),
(39, 32, 3),
(40, 33, 3),
(41, 37, 3),
(42, 40, 3),
(43, 41, 3),
(44, 42, 2),
(45, 42, 3),
(46, 42, 15),
(47, 43, 134),
(48, 43, 3),
(49, 43, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rutinasfavoritas`
--

CREATE TABLE `rutinasfavoritas` (
  `id_cliente` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rutinasfavoritas`
--

INSERT INTO `rutinasfavoritas` (`id_cliente`, `id_rutina`) VALUES
(1, 8),
(2, 3),
(3, 4),
(4, 2),
(5, 2),
(6, 10),
(7, 5),
(8, 8),
(9, 7),
(10, 9),
(11, 8),
(12, 5),
(13, 1),
(14, 2),
(15, 10),
(16, 5),
(17, 7),
(18, 4),
(19, 10),
(20, 6),
(21, 2),
(25, 6);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `nombre_usuario` varchar(15) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `contrasena` varchar(400) NOT NULL,
  `foto_perfil` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `nombre_usuario`, `correo`, `contrasena`, `foto_perfil`) VALUES
(1, 'José', 'Pérez', 'josperez', 'jose01@gmail.com', 'jose013', NULL),
(2, 'Mariana', 'González', 'mariangoz', 'marigonz@gmail.com', 'coutmariti01', NULL),
(3, 'Nashun', 'Wang', 'nwang', 'nashunwaang@gmail.com', 'extrañojapon', NULL),
(4, 'Mariano', 'Vega', 'marianoovega', 'vegamariiano@gmail.com', 'hogema01_', NULL),
(5, 'Vanessa', 'Lanz', 'enav_152003', 'enavlanz_01@gmail.com', 'unicorniofeliz', NULL),
(6, 'Héctor', 'Torres', 'hector.t24', 'hectortorres@gmail.com', 'torresgemelas', NULL),
(7, 'Uri', 'Gopar', 'uri_gopar', 'urigopar@gmail.com', 'gatitosarcoir01', NULL),
(8, 'Sofia', 'Garcia', 'sofiii_garcia', 'sofgarciia22@gmail.com', 'Cg#1fQm*', NULL),
(9, 'Lucas', 'Rodriguez', 'roddlucc', 'rognw012@gmail.com', 'p9XhKd$r', NULL),
(10, 'Ana', 'Perez', 'anappperez', 'ezanap@gmail.com', 'E#7LjFt*', NULL),
(11, 'Daniel', 'Ramirez', 'ramdan', 'ledanfer@gmail.com', 'b4NkM@5x', NULL),
(12, 'Valeria', 'Torres', 'valeria_torres', 'valeria.torres@example.com', 'T2y@5DgH', NULL),
(13, 'Juan', 'Hernandez', 'juan_hernandez', 'juan.hernandez@example.com', 'Rf@8GtS2', NULL),
(14, 'Isabella', 'Gonzalez', 'isabella_glez', 'isabella.gonzalez@example.com', 'q6Wx#7sK', NULL),
(15, 'Andres', 'Castro', 'andres_castro', 'andres.castro@example.com', 'P#3vH8dZ', NULL),
(16, 'Camila', 'Sanchez', 'camila_sanchez', 'camila.sanchez@example.com', 'A5z*9tRq', NULL),
(17, 'Leonardo', 'Lopez', 'leonardo_lopez', 'leonardo.lopez@example.com', 'V8b#4mFp', NULL),
(18, 'Carla', 'Martinez', 'carla_martinez', 'carla.martinez@example.com', 'S@1dN6tJ', NULL),
(19, 'Tomas', 'Diaz', 'tomas_diaz', 'tomas.diaz@example.com', 'V8b#4mFp', NULL),
(20, 'Lucia', 'Ortiz', 'lucia_ortiz', 'lucia.ortiz@example.com', 'G#9nH4jK', NULL),
(25, 'Carlos', 'Velasco', 'Carlos123', 'carlos@carlos.com', '$2a$12$KWLqReEuXZ9ijV4zYX3pp.9vAmmTTOnCHfyn81sNFjaIikmgarrq.', NULL),
(26, 'Diego', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$NimnvQgSqXHcfo/iileb1exuE1N70sdVohBRNGxgP289qSy0Squc.', NULL),
(27, 'Diego ', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$fSZM0IYJzT9ATVnTbcsa7.zdxlgEj5uebtEgRd5chRl1f8PQFTQYa', NULL),
(28, 'Diego', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$sDVFkomJC.NC0pxIJmfVSuKiQqwmd0SDQjLnps0.C9lqJBsw.XeGK', NULL),
(29, 'Diego ', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$cY/WSANToFwMbMrbpqAwNOhneiiaukpTgtoekm.i6uCW8kZh80IL.', NULL),
(30, 'Diego', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$S2AGiq9j8NUf1b6Ukb4CSOIE/NU6lQ3yQnsMM0bM.VGn2zxjPrb5S', NULL),
(31, 'Tito', 'Capotito', 'tito', 'tito@gmail.com', '$2a$12$ENhkQGiolgTs7.BGMUmw1u0Na5/ejKKF.SEfpNXMVfVDjUJA9QVl2', NULL),
(32, 'Diego ', 'Perdomo Salcedo', 'doppio19', 'A01709150@tec.mx', '$2a$12$3tDD9NiMNH./s73U6qXxIe.WMWHHm/VD1ZdX6QkSHMlnbtUjkwOHu', NULL),
(34, 'Carlitos', 'Velasco', 'Carlitos123', 'carlos@carlos.com', '$2a$12$v/j7dzNMxm6mmFvMHKtaMut/xDve7kleC3QpO9A2GkQrMb/3TUJPi', NULL),
(35, 'Diego ', 'Perdomo Salcedo', 'doppio20', 'A01709150@tec.mx', '$2a$12$OdwDbRpqAsKy4tNNY6zzCueejYjD1LPJZv3cfN5mI20fRvG7ftz7m', NULL),
(36, 'Diego2', 'Perdomo Salcedo', 'doppio21', 'A01709150@tec.mx', '$2a$12$vlEzRAsZpTNQP./Q0aMxhuwBPXrwdnNGblylmJ3xqK1Wo0.cpUa2i', NULL),
(37, 'Mafer', 'Moreno', 'mafermoreno', 'Febrero@tec.mx', '$2a$12$d/FEvd.RpBREd5gt6ubTEeYTHs3FR4bHb3IMxmNk5qcaDxg600gkO', NULL),
(38, 'Julio ', 'Perez', 'Julio', 'A01705763@tec.mx', '$2a$12$FODE2L8QIX/DMHHuECZ/2OoF8ZXJs/uqYCJL27x4bh5gmmxlbd1i6', NULL),
(39, 'Uri', 'Gopar', 'gopar', 'gopar@gmail', '$2a$12$YUtTuo4gRBEoVmZPBID7lelp6Zl97k1qwgXfvmVSk.Kf6TiT2G2Wi', NULL),
(40, 'Monica Andrea', 'Ayala Marrero', 'piebsat', 'mayalam2806@gmail.com', '$2a$12$9uODZFAHebJm7fQmXES0SOs.DVmbnBa.Xzp0e.zEa.MuZsBDFrWxC', NULL),
(41, 'h', 'h', 'h', 'h@gmial.com', '$2a$12$FGKjqSn6sebC8/h2K.ddx.9gdo5CwUkSXaysWn0g/47h/3SGrSF/q', NULL),
(42, 'a', 'a', 'a', 'a@gmail.com', '$2a$12$oGdO3vnr0t7huHxTpp/arupBykyY78eWThyhDu/CR4qY6PVwjrsMS', NULL),
(43, 'a', 'a', 'a', 'a@gmail.com', '$2a$12$9MBR8ftbeExZB4SFW7KcHOpo6mpBnIeoN9ZFLHD2Tzrl8vYAisFpS', NULL),
(44, 'b', 'b', 'b', 'b@gmail.com', '$2a$12$0YQME1jMoFZ935U4FfGm..80CxjQlaXgFg3BhcC14BydgKg1GFna2', NULL),
(45, 'c', 'c', 'c', 'c@gmail', '$2a$12$dYB1DIVDJYZDDfu/nSz9rO6t8nXMZUVeEDs3uB9CoxpSkOpyAjX7m', NULL),
(46, 'b', '', '', '', '$2a$12$5GQa78muCiJZ6hfsnpMf8OTdihkABfgS7Tzr6wWrl4w8830uHf28W', NULL),
(47, 'd', 'd', 'd', 'h@gmial.com', '$2a$12$/5CofXIL4muObOxrPD9rS.yBaHN4MnUOWqNOwzPdDl6qVG7rR0.va', NULL),
(48, 't', 't', 't', 'h@gmial.com', '$2a$12$f5E8lBvjYopqsd6hGx6P/eLrfvrUXXK0Pk64aqr/pl/vDRp8Y0KQ6', NULL),
(49, 'y', 'y', 'y', '', '$2a$12$EYx5k4WduQqG7CFHd2fnfeFC.84Eyo8HObcBjkSD2essp/dkPPiuC', NULL),
(50, 'u', 'u', 'u', '', '$2a$12$UpynAelbmFMw.ukx7Otque.uSAsM5GtieUBrbPUlpiq246J9C0HAy', NULL),
(51, 'w', 'w', '', '', '$2a$12$K/BRQDE24sjg4r3OIHDYO.0gs3.W4n872FPSMLj9VfLSWuH9043dS', NULL),
(52, '´p', 'p', '', '', '$2a$12$1Weft/vBgfxmZ2Tw.dHh4u/tV07/9lnVylq8mAMX555SiUWPkmXva', NULL),
(53, 'o', 'o', 'o', '', '$2a$12$Hfkzs6g2AcLwAFlsbt5.6uxuEC/al/NIqtcLtGZa44aegTPwTjtva', NULL),
(54, 'e', '', '', '', '$2a$12$oIyfhpXUuaS.mH.NkZ3B6OD3XJQufweXmpbLJU8/PspWpU9q8jUzi', NULL),
(55, 'q', '', '', '', '$2a$12$6DzLQEjtsTuqTaqmRSsi4.GczY8ZT.E1gE23EU6si49t89G54ng52', NULL),
(56, 'x', 'x', 'x', '', '$2a$12$B4A8fUkpQK/oEbDwrKicvutYXEadlF8jps6m7tU1j6UMfy6B4m4Se', NULL),
(57, 'll', 'l', '', '', '$2a$12$tFYoWdeXiWcPqoR1CYRX0.zPS8hnIvesluJxl2Bh5rAQBS9WxLkaO', NULL),
(58, 'lllll', '', '', '', '$2a$12$XKn9g1BVTRkojxGVuxNKzeXER/dYnZ0UIKzlPg2wW/6wtdWctc5GK', NULL),
(59, 'sssssss', 'ssss', 'sssss', '', '$2a$12$FMH8ylFN0Q4Knv/KabhhYuC0izb4xWpVruCmbbiPstQCEESWrH.Tu', NULL),
(60, 'dddd', 'dddd', 'ddddddd', '', '$2a$12$taqymC.ftmixssp2bG2QdehqpPOE6KpkKeLVO5E5UHFuNKhyBH4py', NULL),
(89, 'uwu', '', 'uwu', '', '$2a$12$0zoNW/NnUJu6cmob2DLS4uFlpSUSU8ynjFbiYTZRqqksPB2MYpLb6', NULL),
(90, 'uwu2', '', 'uwu2', '', '$2a$12$KbbHJYl1dY6sKc7xxZ1.aeOjJTPoRAX45fEpWaKxObmPV4JildT.6', NULL),
(91, 'uwu3', '', 'uu3', '', '$2a$12$nfJuDRmd.CIfAK3JGJ3ZSeVzJM4OEF5lSauLUh8PorQKAX0FnSJDq', NULL),
(92, 'Uwux4', '', 'uwu5', '', '$2a$12$ZJJl37v9E1/C9dmoIuUsC.U9993qzCtUUko2u9Q4fahjmq6xbHo1C', NULL),
(93, 'uwu5', '', 'uuuuuu', '', '$2a$12$ex.A.32eVdjSda8kx9HUPuBkisMIUxysLWjFDmqLz.k2qQeSWBZv2', NULL),
(94, 'jojojo', '', 'jojojo', '', '$2a$12$GaIpzLbQ5Kx68Hh.TCCx4.XRc2E.iD6ZVKs9/8bZfcIZjP1J33rxG', NULL),
(95, 'jijiji', '', 'jijijij', '', '$2a$12$/wCar33KDBwt6zHz5/huze5XtzAehqLA.Ad4xkwVm7tZnZ5HgcLZ2', NULL),
(96, 'ki', 'h', 'h', 'b@gmail.com', '$2a$12$EEWhsJLLyayhylAnHCLJxOFj8ZoZ479em4TMmBHW12rT3Nz2c1q0m', NULL),
(97, 'as', 'h', 'a', 'gopar@gmail', '$2a$12$P4ZeGhTy0ClmcJbS.iQ8ieSdZ4gG4aApFWNSKNeCfYnRHynMTY03m', NULL),
(98, 'as', 'a', 'h', '', '$2a$12$LWvhl.i0dxvqPfzKzTHFR.SuQkzCxz7IfZTgy0yUH6QHb1vAXFNcC', NULL),
(99, 'h', '', 'a', '', '$2a$12$hyv6r69wTTyZ/aR3khCqeeTGu5Y60TiEhEw2rz.WlLpPK9SXRACEu', NULL),
(100, 'b', '', 'sddsa', '', '$2a$12$XGANtUD0dO8KZwJX3D3dLOM988/V8MGQJhAdurOyMU8zOO1ea380m', NULL),
(101, 'h', '', 'h', '', '$2a$12$X08niQct09l7YmdZuOYad.HYWBt02gQUhWPPeeTt34vN4TIDCA5HS', NULL),
(102, 'sd', '', 'sdas', '', '$2a$12$K9w2ZQqf5C14HA.hikVWWe6rkn9XA76/cdDBOTvc6LzKPZ9di85BK', NULL),
(103, 'a', 'a', 'a', 'a@gmail.com', '$2a$12$T6hnAfQbPMyBmNAUSB/NEecPpKmZ/veX1..fWSQJ68RzlU5Mnht3u', NULL),
(104, 'a', 'a', 'a', 'a@gmail.com', '$2a$12$j7OKouq371kdNj99Vus4X.QLSpkLySKxNYdHc13xuifPxSf9WawzS', NULL),
(105, 'Zuri', 'Moreno', 'zuri', 'Zuri@gmail.com', '$2a$12$toWy6ycazLtg8tCzJKvTvOfbkLJp9OshvUGBZQrU.ujHqiKPkk2HO', NULL),
(106, 'ee', 'e', 'e', 'h@gmial.com', '$2a$12$iN4ZA.mIxPrMyIkemaTL6ewaGqEQK4S2jvdRy3c6ETyG1MvFsfS/C', NULL),
(107, 'b', 'b', 'b', 'h@gmial.com', '$2a$12$L9kFAAwstXP/Cu/qyxaHh.8Mxw0K2hSvhlSrT8rGs3ML4cmhRRNUa', NULL),
(108, 'a', 'qq', 'q', 'a@gmail.com', '$2a$12$JK38CmJuW0wbAntk3MV6G.TuXjbEkMPwp15VkPZkhN2I2/zR2PUnG', NULL),
(109, 'e', 'ee', 'e', 'h@gmial.com', '$2a$12$SxIOudFJ1Q/qYuusp1jNJeb5khGFcVRkyrbsdsiceImfcBOXQ9Y1O', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `usuariorol`
--

CREATE TABLE `usuariorol` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuariorol`
--

INSERT INTO `usuariorol` (`id_usuario`, `id_rol`, `CreatedAt`) VALUES
(1, 1, '2023-04-18 16:36:47'),
(2, 2, '2023-04-18 16:36:47'),
(3, 2, '2023-04-18 16:36:47'),
(4, 1, '2023-04-18 16:36:47'),
(5, 1, '2023-04-18 16:36:47'),
(6, 1, '2023-04-18 16:36:47'),
(7, 1, '2023-04-18 16:36:47'),
(8, 1, '2023-04-18 16:36:47'),
(9, 2, '2023-04-18 16:36:47'),
(10, 2, '2023-04-18 16:36:47'),
(11, 1, '2023-04-18 16:36:47'),
(12, 2, '2023-04-18 16:36:47'),
(13, 2, '2023-04-18 16:36:47'),
(14, 2, '2023-04-18 16:36:47'),
(15, 1, '2023-04-18 16:36:47'),
(16, 1, '2023-04-18 16:36:47'),
(17, 1, '2023-04-18 16:36:47'),
(18, 1, '2023-04-18 16:36:47'),
(19, 1, '2023-04-18 16:36:47'),
(20, 2, '2023-04-18 16:36:47'),
(25, 1, '2023-04-18 16:36:47'),
(34, 1, '2023-04-18 16:36:47'),
(35, 2, '2023-04-18 16:36:47'),
(36, 1, '2023-04-18 16:36:47'),
(37, 2, '2023-04-18 16:36:47'),
(38, 1, '2023-04-18 16:36:47'),
(39, 1, '2023-04-18 16:36:47'),
(40, 1, '2023-04-18 16:36:47'),
(41, 1, '2023-04-18 18:36:32'),
(41, 1, '2023-04-18 18:45:40'),
(41, 1, '2023-04-18 19:07:20'),
(42, 1, '2023-04-18 16:36:47'),
(42, 1, '2023-04-18 18:38:39'),
(42, 1, '2023-04-18 18:57:23'),
(42, 1, '2023-04-18 21:05:02'),
(42, 1, '2023-04-18 21:53:24'),
(44, 1, '2023-04-18 22:32:34'),
(45, 1, '2023-04-18 16:36:47'),
(46, 1, '2023-04-18 16:36:47'),
(46, 1, '2023-04-18 16:37:50'),
(46, 1, '2023-04-18 16:38:57'),
(46, 1, '2023-04-18 16:46:52'),
(46, 1, '2023-04-18 16:48:39'),
(46, 1, '2023-04-18 16:58:11'),
(46, 1, '2023-04-18 17:00:20'),
(46, 1, '2023-04-18 17:02:46'),
(46, 1, '2023-04-18 17:08:20'),
(47, 1, '2023-04-18 16:36:47'),
(49, 1, '2023-04-18 16:36:47'),
(50, 1, '2023-04-18 16:36:47'),
(60, 1, '2023-04-18 16:36:47'),
(91, 1, '2023-04-18 17:50:42'),
(94, 1, '2023-04-18 18:33:15'),
(95, 1, '2023-04-18 18:35:10'),
(100, 1, '2023-04-18 19:04:41'),
(102, 1, '2023-04-18 19:07:49'),
(105, 1, '2023-04-18 22:27:00'),
(106, 1, '2023-04-18 22:29:35'),
(106, 1, '2023-04-18 23:03:57'),
(108, 1, '2023-04-18 22:50:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_cliente`,`id_rutina`,`created_at`),
  ADD KEY `id_rutina` (`id_rutina`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `id_rutina` (`id_rutina`),
  ADD KEY `id_dieta` (`id_dieta`),
  ADD KEY `id_obj` (`id_obj`),
  ADD KEY `id_niv` (`id_niv`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `clientemedicion`
--
ALTER TABLE `clientemedicion`
  ADD PRIMARY KEY (`id_cliente`,`id_medicion`,`fecha`),
  ADD KEY `id_medicion` (`id_medicion`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indexes for table `dieta`
--
ALTER TABLE `dieta`
  ADD PRIMARY KEY (`id_dieta`),
  ADD KEY `id_macro` (`id_macro`),
  ADD KEY `id_micro` (`id_micro`);

--
-- Indexes for table `dietasalimentos`
--
ALTER TABLE `dietasalimentos`
  ADD PRIMARY KEY (`id_dietaalimento`),
  ADD KEY `id_dieta` (`id_dieta`);

--
-- Indexes for table `dietasfavoritas`
--
ALTER TABLE `dietasfavoritas`
  ADD PRIMARY KEY (`id_cliente`,`id_dieta`),
  ADD KEY `id_dieta` (`id_dieta`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indexes for table `ejercicio`
--
ALTER TABLE `ejercicio`
  ADD PRIMARY KEY (`id_ejercicio`);

--
-- Indexes for table `macronutrientes`
--
ALTER TABLE `macronutrientes`
  ADD PRIMARY KEY (`id_macro`);

--
-- Indexes for table `medicion`
--
ALTER TABLE `medicion`
  ADD PRIMARY KEY (`id_medicion`);

--
-- Indexes for table `micronutrientes`
--
ALTER TABLE `micronutrientes`
  ADD PRIMARY KEY (`id_micro`);

--
-- Indexes for table `nivelfisico`
--
ALTER TABLE `nivelfisico`
  ADD PRIMARY KEY (`id_niv`);

--
-- Indexes for table `objetivo`
--
ALTER TABLE `objetivo`
  ADD PRIMARY KEY (`id_obj`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `rutina`
--
ALTER TABLE `rutina`
  ADD PRIMARY KEY (`id_rutina`);

--
-- Indexes for table `rutinaejercicio`
--
ALTER TABLE `rutinaejercicio`
  ADD PRIMARY KEY (`id_rutinaejercicio`,`id_rutina`,`id_ejercicio`),
  ADD KEY `id_ejercicio` (`id_ejercicio`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indexes for table `rutinasfavoritas`
--
ALTER TABLE `rutinasfavoritas`
  ADD PRIMARY KEY (`id_cliente`,`id_rutina`),
  ADD KEY `id_rutina` (`id_rutina`),
  ADD KEY `id_cliente` (`id_cliente`) USING BTREE;

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indexes for table `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`,`CreatedAt`) USING BTREE,
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_usuario` (`id_usuario`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `dieta`
--
ALTER TABLE `dieta`
  MODIFY `id_dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `dietasalimentos`
--
ALTER TABLE `dietasalimentos`
  MODIFY `id_dietaalimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `macronutrientes`
--
ALTER TABLE `macronutrientes`
  MODIFY `id_macro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `micronutrientes`
--
ALTER TABLE `micronutrientes`
  MODIFY `id_micro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `nivelfisico`
--
ALTER TABLE `nivelfisico`
  MODIFY `id_niv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `objetivo`
--
ALTER TABLE `objetivo`
  MODIFY `id_obj` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rutina`
--
ALTER TABLE `rutina`
  MODIFY `id_rutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `rutinaejercicio`
--
ALTER TABLE `rutinaejercicio`
  MODIFY `id_rutinaejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `bitacora_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`);

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`),
  ADD CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `cliente_ibfk_3` FOREIGN KEY (`id_obj`) REFERENCES `objetivo` (`id_obj`),
  ADD CONSTRAINT `cliente_ibfk_4` FOREIGN KEY (`id_niv`) REFERENCES `nivelfisico` (`id_niv`),
  ADD CONSTRAINT `cliente_ibfk_5` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Constraints for table `clientemedicion`
--
ALTER TABLE `clientemedicion`
  ADD CONSTRAINT `clientemedicion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `clientemedicion_ibfk_2` FOREIGN KEY (`id_medicion`) REFERENCES `medicion` (`id_medicion`);

--
-- Constraints for table `dieta`
--
ALTER TABLE `dieta`
  ADD CONSTRAINT `dieta_ibfk_1` FOREIGN KEY (`id_macro`) REFERENCES `macronutrientes` (`id_macro`),
  ADD CONSTRAINT `dieta_ibfk_2` FOREIGN KEY (`id_micro`) REFERENCES `micronutrientes` (`id_micro`);

--
-- Constraints for table `dietasalimentos`
--
ALTER TABLE `dietasalimentos`
  ADD CONSTRAINT `dietasalimentos_ibfk_1` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`);

--
-- Constraints for table `dietasfavoritas`
--
ALTER TABLE `dietasfavoritas`
  ADD CONSTRAINT `dietasfavoritas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `dietasfavoritas_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`);

--
-- Constraints for table `rutinaejercicio`
--
ALTER TABLE `rutinaejercicio`
  ADD CONSTRAINT `rutinaejercicio_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`),
  ADD CONSTRAINT `rutinaejercicio_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`);

--
-- Constraints for table `rutinasfavoritas`
--
ALTER TABLE `rutinasfavoritas`
  ADD CONSTRAINT `rutinasfavoritas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `rutinasfavoritas_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`);

--
-- Constraints for table `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD CONSTRAINT `usuariorol_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `usuariorol_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
