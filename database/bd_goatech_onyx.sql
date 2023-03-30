-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 16, 2023 at 03:21 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_goatech_onyx`
--

-- --------------------------------------------------------

--
-- Table structure for table `alimento`
--

CREATE TABLE `alimento` (
  `id_alimento` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `medida` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `alimento`
--

INSERT INTO `alimento` (`id_alimento`, `nombre`, `medida`) VALUES
(1, 'Manzana', 'Pieza'),
(2, 'Nugget de pollo', 'Pieza'),
(3, 'Papaya', 'Taza'),
(4, 'Pollo', 'Gramo'),
(5, 'Huevo', 'Pieza'),
(6, 'Entomatadas', 'Pieza'),
(7, 'Chuleta', 'Gramo'),
(8, 'Tomates', 'Rebanada'),
(9, 'Lechuga', 'Gramo'),
(10, 'Pan Tostado', 'Rebanada'),
(11, 'Carne de res', 'Gramo'),
(12, 'Carne de Puerco', 'Gramo'),
(13, 'Jamón', 'Gramo'),
(14, 'Platano', 'Pieza'),
(15, 'Pan dulce', 'Pieza'),
(16, 'Azúcar', 'Cucharada'),
(17, 'Sal', 'Cucharada'),
(18, 'Crema de maní', 'Cucharada'),
(19, 'Almendras', 'Gramo'),
(20, 'Queso', 'Gramo'),
(21, 'Claras de Huevo', 'Pieza'),
(22, 'Frijoles', 'Gramo'),
(23, 'Tortillas', 'Pieza'),
(24, 'Aguacate', 'Pieza'),
(25, 'Uvas', 'Pieza'),
(26, 'Naranjas', 'Pieza'),
(27, 'Agua', 'Mililitros'),
(28, 'Pasta', 'Gramo'),
(29, 'Aceite', 'Cucharada'),
(30, 'Tostadas', 'Pieza'),
(31, 'Leche de vaca', 'Mililitros'),
(32, 'Leche de soya', 'Mililitros'),
(33, 'Leche de como', 'Mililitros'),
(34, 'Jugo de naranja', 'Mililitros'),
(35, 'Jugo verde', 'Mililitros'),
(36, 'Jugo de toronja', 'Mililitros'),
(37, 'Toronja', 'Pieza'),
(38, 'Aceite de oliva', 'Cucharada'),
(39, 'Avena', 'Taza');

-- --------------------------------------------------------

--
-- Table structure for table `bitacora`
--

CREATE TABLE `bitacora` (
  `id_cliente` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nivel_satisf` int(2) DEFAULT NULL,
  `descripcion_sesion` varchar(500) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `comentarios` varchar(500) COLLATE utf8mb4_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `bitacora`
--

INSERT INTO `bitacora` (`id_cliente`, `id_rutina`, `fecha`, `nivel_satisf`, `descripcion_sesion`, `comentarios`) VALUES
(1, 1, '2023-02-13 00:00:00', 5, '10 lagartijas con 5 press', 'Hoy me sentí súper, pude hacer todos los ejercicios de manera increíble, me sentí muy motivado.'),
(1, 4, '2023-02-01 00:00:00', 4, 'Leg press 8 x 100kg Squats 10 x  65kg 100 sentadillas', 'Me fue muy bien pero me asusto el wey que cargo 300kg de sentadilla al lado mio'),
(2, 3, '2023-02-02 00:00:00', 5, 'Bench press 3x38kg, peso muerto 8x100kg', 'Comi mucha pasta y me hizo sentir mal durante el entrenamiento'),
(3, 8, '2023-01-14 00:00:00', 2, '15 kilómetros en la maquina de correr', 'Por poco me desmayo en los últimos kilometros y vomite en el baño, todo valdrá la pena cuando baje de peso'),
(4, 1, '2023-03-22 00:00:00', 5, '100 lagartijas, 100 sentadillas, 10 kilometros ', 'Me sentí muy bien, como mi personaje favorito'),
(5, 2, '2023-01-12 00:00:00', 2, '2000 metros en la piscina', 'Me debe poner protector solar porque se me había quedado la espalda bien roja por nadar en el sol'),
(6, 5, '2023-01-03 00:00:00', 4, '10x80kg sentadillas, 10 minutos corriendo en la caminadora.', 'Me duelen demasiado las piernas pero se sintió bien.'),
(7, 6, '2022-11-18 00:00:00', 2, 'Una hora de clases de Zumba, 10 minutos en la caminadora', 'La instructora fue muy agresiva conmigo cuando yo solo quería disfrutar de mi ejercicio.'),
(8, 9, '2023-05-05 00:00:00', 5, 'chest flies 10x20kg, dumbbell press 12x 22kg, shoulder raises 12x15kg', NULL),
(9, 10, '2023-08-25 00:00:00', NULL, '25x200kg peso puerto', NULL),
(10, 7, '2010-08-14 00:00:00', 2, '15 kilómetros en la maquina de correr', 'Por poco me desmayo en los últimos kilometros y vomite en el baño, todo valdrá la pena cuando baje de peso');

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `id_rutina` int(11) NOT NULL,
  `id_dieta` int(11) NOT NULL,
  `id_obj` int(11) NOT NULL,
  `id_niv` int(11) NOT NULL,
  `imc` float(3,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_rutina`, `id_dieta`, `id_obj`, `id_niv`, `imc`) VALUES
(1, 8, 5, 3, 1, NULL),
(2, 3, 8, 2, 3, NULL),
(3, 7, 6, 1, 4, NULL),
(4, 5, 3, 2, 2, NULL),
(5, 9, 4, 2, 2, NULL),
(6, 10, 9, 1, 3, NULL),
(7, 5, 1, 2, 1, NULL),
(8, 8, 7, 3, 1, NULL),
(9, 7, 10, 2, 3, NULL),
(10, 9, 6, 2, 4, NULL),
(11, 8, 7, 2, 3, NULL),
(12, 2, 1, 2, 1, NULL),
(13, 1, 9, 2, 3, NULL),
(14, 2, 2, 2, 2, NULL),
(15, 10, 10, 3, 4, NULL),
(16, 5, 5, 3, 1, NULL),
(17, 7, 6, 2, 1, NULL),
(18, 4, 5, 3, 4, NULL),
(19, 10, 5, 3, 3, NULL),
(20, 9, 6, 2, 4, NULL);

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

-- --------------------------------------------------------

--
-- Table structure for table `dieta`
--

CREATE TABLE `dieta` (
  `id_dieta` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tipo_dieta` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `id_macro` int(11) NOT NULL,
  `id_micro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `dieta`
--

INSERT INTO `dieta` (`id_dieta`, `nombre`, `tipo_dieta`, `id_macro`, `id_micro`) VALUES
(1, 'Rico pollo', 'Aumento peso', 1, 1),
(2, 'Pollo', 'Mantner peso', 6, 3),
(3, 'Ensalada Cesar', 'Bajar peso', 3, 10),
(4, 'Pescado', 'Mantener', 4, 12),
(5, 'Dieta detox', 'Ganar masa', 5, 8),
(6, 'Dieta Hipercalórica', 'Bajar peso', 7, 11),
(7, 'Dieta hipocalórica', 'Subir peso', 2, 2),
(8, 'Dieta Proteica', 'Ganar musculo', 5, 5),
(9, 'Equelibrada', 'Mantener peso', 2, 7),
(10, 'Dieta de Volumen', 'Aumentar peso', 5, 8);

-- --------------------------------------------------------

--
-- Table structure for table `dietasalimentos`
--

CREATE TABLE `dietasalimentos` (
  `id_dieta` int(11) NOT NULL,
  `id_alimento` int(11) NOT NULL,
  `cantidad` float(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `dietasalimentos`
--

INSERT INTO `dietasalimentos` (`id_dieta`, `id_alimento`, `cantidad`) VALUES
(1, 3, 4.10),
(1, 5, 3244.23),
(1, 12, 34.23),
(1, 21, 244.20),
(1, 23, 432.23),
(1, 36, 443.90),
(2, 7, 43.90),
(2, 10, 3.00),
(2, 19, 3.20),
(2, 28, 324.53),
(2, 33, 432.30),
(3, 1, 534.30),
(3, 4, 2.10),
(3, 11, 43.30),
(3, 22, 2323.30),
(3, 34, 234.22),
(4, 2, 5000.10),
(4, 20, 534.60),
(4, 25, 654.23),
(4, 32, 545.30),
(4, 33, 452.40),
(5, 2, 234.00),
(5, 7, 242.20),
(5, 8, 234.20),
(5, 9, 234.20),
(5, 33, 242.23),
(6, 3, 5.00),
(6, 11, 424.20),
(6, 19, 4332.40),
(6, 22, 422.43),
(6, 23, 4244.00),
(7, 4, 43.20),
(7, 16, 543.20),
(7, 20, 200.00),
(7, 21, 224.40),
(7, 29, 324.00),
(8, 1, 3.00),
(8, 5, 30.00),
(8, 7, 43.20),
(8, 9, 234.20),
(8, 35, 35.30),
(9, 4, 23.40),
(9, 6, 3.00),
(9, 14, 23.20),
(9, 16, 23.40),
(9, 26, 42.09),
(9, 36, 34.20),
(10, 3, 23.20),
(10, 9, 4.00),
(10, 10, 242.20),
(10, 11, 23.40),
(10, 28, 534.24);

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
(4, 2),
(1, 3),
(6, 3),
(3, 4),
(8, 5),
(9, 6),
(5, 9),
(10, 9),
(2, 10),
(7, 10);

-- --------------------------------------------------------

--
-- Table structure for table `ejercicio`
--

CREATE TABLE `ejercicio` (
  `id_ejercicio` int(11) NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL,
  `video_ejercicio` text COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `ejercicio`
--

INSERT INTO `ejercicio` (`id_ejercicio`, `descripcion`, `video_ejercicio`) VALUES
(1, 'Curt de bicep', 'link bonito'),
(2, 'Lagartijas', 'link bonito'),
(3, 'Abdominales', 'link bonito'),
(4, 'Remo', 'link bonito'),
(5, 'Plancha', 'link bonito'),
(6, 'Sentadillas', 'link bonito'),
(7, 'Dominadas', 'link bonito'),
(8, 'Press de pecho', 'link bonito'),
(9, 'Martillos', 'link bonito'),
(10, 'Elevaciones de piernas', 'link bonito'),
(11, 'Caminadora', 'link bonito'),
(12, 'Bicicleta de piso', 'link bonito'),
(13, 'Extension de tricep', 'link bonito'),
(14, 'Fondos', 'link bonito'),
(15, 'Press Militar', 'link bonito'),
(16, 'Peso Muerto', 'link bonito'),
(17, 'Remo invertido', 'link bonito'),
(18, 'Apertura de pecho', 'link bonito'),
(19, 'Cristos', 'link bonito'),
(20, 'Cruce de Polea', 'link bonito');

-- --------------------------------------------------------

--
-- Table structure for table `macronutrientes`
--

CREATE TABLE `macronutrientes` (
  `id_macro` int(11) NOT NULL,
  `calorias` float(7,2) NOT NULL,
  `proteinas` float(7,2) NOT NULL,
  `carbohidratos` float(7,2) NOT NULL,
  `grasas` float(7,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `macronutrientes`
--

INSERT INTO `macronutrientes` (`id_macro`, `calorias`, `proteinas`, `carbohidratos`, `grasas`) VALUES
(1, 2500.23, 342.43, 457.98, 579.89),
(2, 4346.30, 533.02, 5424.54, 23.00),
(3, 3324.00, 245.43, 23.54, 345.34),
(4, 1200.00, 543.50, 435.00, 234.00),
(5, 2353.23, 432.40, 343.00, 345.30),
(6, 3000.00, 534.23, 433.34, 345.23),
(7, 2000.00, 345.23, 345.43, 234.53),
(8, 53462.53, 35934.02, 59358.02, 43850.34),
(9, 0.00, 0.00, 0.00, 0.00),
(10, 438.34, 2485.23, 4403.23, 434.23);

-- --------------------------------------------------------

--
-- Table structure for table `medicion`
--

CREATE TABLE `medicion` (
  `id_medicion` int(11) NOT NULL,
  `tipo` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL
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
(10, 'Peso');

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
(12, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0);

-- --------------------------------------------------------

--
-- Table structure for table `nivelfisico`
--

CREATE TABLE `nivelfisico` (
  `id_niv` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `nivelfisico`
--

INSERT INTO `nivelfisico` (`id_niv`, `nombre`, `descripcion`) VALUES
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
  `nombre` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `objetivo`
--

INSERT INTO `objetivo` (`id_obj`, `nombre`, `descripcion`) VALUES
(1, 'Bajar peso', 'Adelgaza y tonifica cuerpo'),
(2, 'Mantener peso', 'Se mantiene el peso, pero genera musculo'),
(3, 'Subir peso', 'Dieta rica en carbohidratos y calorías para subir el peso');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL
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
  `nombre` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `tiporutina` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rutina`
--

INSERT INTO `rutina` (`id_rutina`, `nombre`, `tiporutina`, `descripcion`) VALUES
(1, 'pecho_explosivo', 'pecho', 'Realizar un fuerte entrenamiento de pecho'),
(2, 'Pierna_tonifcar', 'Pierna', 'realizar un leve entrenamiento'),
(3, 'Bicep_cara', 'bicep', 'Realizar entrenamiento de fuerza con mancuernas'),
(4, 'Pecho Alto', 'Pecho', 'Realizar entrenamiento de fuerza con barra'),
(5, 'Pecho Medio', 'Pecho', 'Realizar entrenamiento de progresión'),
(6, 'Pecho Bajo', 'Pecho', 'Realizar entrenamiento de fuerza con poleas'),
(7, 'Tricep y Bicep', 'Tricep-bicep', 'Realizar entrenamiento de fuerza con mancuernas'),
(8, 'Espalda y hombro', 'Espalda', 'Realizar entrenamiento de fuerza con mancuernas'),
(9, 'Pecho y hombro', 'P y H', 'Aumento de fuerza'),
(10, 'Espalda Baja', 'Espalda', 'Tonificar musculos bajos');

-- --------------------------------------------------------

--
-- Table structure for table `rutinaejercicio`
--

CREATE TABLE `rutinaejercicio` (
  `id_rutina` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL,
  `series` int(3) NOT NULL,
  `repeticiones` int(4) NOT NULL,
  `dia` varchar(3) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `rutinaejercicio`
--

INSERT INTO `rutinaejercicio` (`id_rutina`, `id_ejercicio`, `series`, `repeticiones`, `dia`) VALUES
(1, 2, 3, 10, 'LUN'),
(1, 3, 5, 12, 'LUN'),
(1, 4, 2, 20, 'LUN'),
(1, 5, 1, 15, 'LUN'),
(1, 7, 2, 15, 'LUN'),
(2, 3, 5, 10, 'JUE'),
(2, 5, 1, 10, 'JUE'),
(2, 10, 2, 10, 'JUE'),
(3, 1, 5, 15, 'VIE'),
(3, 2, 5, 15, 'VIE'),
(3, 3, 5, 15, 'VIE'),
(3, 4, 5, 15, 'VIE'),
(4, 2, 5, 20, 'SAB'),
(4, 5, 4, 20, 'SAB'),
(5, 7, 5, 10, 'MAR'),
(5, 9, 5, 20, 'MAR'),
(6, 3, 2, 6, 'MIE'),
(6, 5, 2, 3, 'MIE'),
(6, 7, 2, 1, 'MIE'),
(7, 13, 4, 10, 'SAB'),
(7, 15, 2, 15, 'SAB'),
(7, 20, 3, 20, 'SAB'),
(8, 2, 2, 10, 'VIE'),
(8, 4, 1, 10, 'VIE'),
(8, 5, 5, 8, 'VIE'),
(9, 3, 3, 10, 'LUN'),
(9, 6, 5, 9, 'LUN'),
(10, 2, 2, 12, 'MAR'),
(10, 5, 5, 8, 'MAR'),
(10, 9, 10, 5, 'MAR');

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
(20, 6);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `apellido` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre_usuario` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `correo` varchar(30) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `contrasena` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `foto_perfil` mediumtext COLLATE utf8mb4_spanish2_ci,
  `sexo` varchar(1) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `nombre_usuario`, `correo`, `contrasena`, `foto_perfil`, `sexo`, `fecha_nacimiento`) VALUES
(1, 'José', 'Pérez', 'josperez', 'jose01@gmail.com', 'jose013', NULL, 'M', '2003-02-01'),
(2, 'Mariana', 'González', 'mariangoz', 'marigonz@gmail.com', 'coutmariti01', NULL, 'F', '2001-04-02'),
(3, 'Nashun', 'Wang', 'nwang', 'nashunwaang@gmail.com', 'extrañojapon', NULL, 'M', '1998-12-31'),
(4, 'Mariano', 'Vega', 'marianoovega', 'vegamariiano@gmail.com', 'hogema01_', NULL, 'M', '1994-03-22'),
(5, 'Vanessa', 'Lanz', 'enav_152003', 'enavlanz_01@gmail.com', 'unicorniofeliz', NULL, 'F', '2003-09-15'),
(6, 'Héctor', 'Torres', 'hector.t24', 'hectortorres@gmail.com', 'torresgemelas', NULL, 'M', '2000-04-24'),
(7, 'Uri', 'Gopar', 'uri_gopar', 'urigopar@gmail.com', 'gatitosarcoir01', NULL, 'M', '1995-03-21'),
(8, 'Sofia', 'Garcia', 'sofiii_garcia', 'sofgarciia22@gmail.com', 'Cg#1fQm*', NULL, 'F', '1993-03-21'),
(9, 'Lucas', 'Rodriguez', 'roddlucc', 'rognw012@gmail.com', 'p9XhKd$r', NULL, 'M', '1988-07-14'),
(10, 'Ana', 'Perez', 'anappperez', 'ezanap@gmail.com', 'E#7LjFt*', NULL, 'F', '2001-11-03'),
(11, 'Daniel', 'Ramirez', 'ramdan', 'ledanfer@gmail.com', 'b4NkM@5x', NULL, 'M', '1993-02-28'),
(12, 'Valeria', 'Torres', 'valeria_torres', 'valeria.torres@example.com', 'T2y@5DgH', NULL, 'F', '1990-09-05'),
(13, 'Juan', 'Hernandez', 'juan_hernandez', 'juan.hernandez@example.com', 'Rf@8GtS2', NULL, 'M', '2003-06-17'),
(14, 'Isabella', 'Gonzalez', 'isabella_glez', 'isabella.gonzalez@example.com', 'q6Wx#7sK', NULL, 'F', '1998-04-23'),
(15, 'Andres', 'Castro', 'andres_castro', 'andres.castro@example.com', 'P#3vH8dZ', NULL, 'M', '1996-01-30'),
(16, 'Camila', 'Sanchez', 'camila_sanchez', 'camila.sanchez@example.com', 'A5z*9tRq', NULL, 'F', '1989-05-08'),
(17, 'Leonardo', 'Lopez', 'leonardo_lopez', 'leonardo.lopez@example.com', 'V8b#4mFp', NULL, 'M', '2000-10-22'),
(18, 'Carla', 'Martinez', 'carla_martinez', 'carla.martinez@example.com', 'S@1dN6tJ', NULL, 'F', '1998-04-23'),
(19, 'Tomas', 'Diaz', 'tomas_diaz', 'tomas.diaz@example.com', 'V8b#4mFp', NULL, 'M', '2000-10-22'),
(20, 'Lucia', 'Ortiz', 'lucia_ortiz', 'lucia.ortiz@example.com', 'G#9nH4jK', NULL, 'F', '1997-09-11');

-- --------------------------------------------------------

--
-- Table structure for table `usuariorol`
--

CREATE TABLE `usuariorol` (
  `id_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuariorol`
--

INSERT INTO `usuariorol` (`id_usuario`, `id_rol`) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 2),
(10, 2),
(11, 1),
(12, 2),
(13, 2),
(14, 2),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alimento`
--
ALTER TABLE `alimento`
  ADD PRIMARY KEY (`id_alimento`);

--
-- Indexes for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_cliente`,`id_rutina`,`fecha`),
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
  ADD KEY `id_niv` (`id_niv`);

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
  ADD PRIMARY KEY (`id_dieta`,`id_alimento`),
  ADD KEY `id_alimento` (`id_alimento`),
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
  ADD PRIMARY KEY (`id_rutina`,`id_ejercicio`),
  ADD KEY `id_ejercicio` (`id_ejercicio`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indexes for table `rutinasfavoritas`
--
ALTER TABLE `rutinasfavoritas`
  ADD PRIMARY KEY (`id_cliente`,`id_rutina`),
  ADD UNIQUE KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_rutina` (`id_rutina`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indexes for table `usuariorol`
--
ALTER TABLE `usuariorol`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alimento`
--
ALTER TABLE `alimento`
  MODIFY `id_alimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `dieta`
--
ALTER TABLE `dieta`
  MODIFY `id_dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `macronutrientes`
--
ALTER TABLE `macronutrientes`
  MODIFY `id_macro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `micronutrientes`
--
ALTER TABLE `micronutrientes`
  MODIFY `id_micro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id_rutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

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
  ADD CONSTRAINT `cliente_ibfk_4` FOREIGN KEY (`id_niv`) REFERENCES `nivelfisico` (`id_niv`);

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
  ADD CONSTRAINT `dietasalimentos_ibfk_1` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`),
  ADD CONSTRAINT `dietasalimentos_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimento` (`id_alimento`);

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
