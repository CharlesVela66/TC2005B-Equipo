-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-goatech.alwaysdata.net
-- Generation Time: Apr 27, 2023 at 06:40 AM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`goatech`@`%` PROCEDURE `actualizar_alimento_en_dieta` (IN `dieta_id` INT(11), IN `dietaalimento_id` INT(11), IN `dieta_nombre` VARCHAR(50), IN `dieta_medida` VARCHAR(50), IN `dieta_cantidad` INT(5))   UPDATE dietasalimentos SET 
  nombre = IFNULL(dieta_nombre, nombre), 
  medida = IFNULL(dieta_medida, medida), 
  cantidad = IFNULL(dieta_cantidad, cantidad)
WHERE id_dietaalimento = dietaalimento_id AND id_dieta = dieta_id$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `agregar_alimento_dieta` (IN `dieta_id` INT(11), IN `dieta_nombre` VARCHAR(50), IN `dieta_medida` VARCHAR(50), IN `dieta_cantidad` INT(5))   INSERT INTO dietasalimentos(id_dieta, nombre, medida, cantidad)VALUES (dieta_id, dieta_nombre, dieta_medida, dieta_cantidad)$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `agregar_ejercicio_rutina` (IN `rutina_id` INT(11), IN `ejercicio_id` INT(11))   INSERT INTO rutinaejercicio (id_rutina, id_ejercicio) VALUES (rutina_id, ejercicio_id)$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `editar_dieta` (IN `dieta_id` INT(11), IN `dieta_nombre` VARCHAR(25), IN `dieta_tipo` VARCHAR(15), IN `dieta_Url_image` TEXT)   UPDATE dieta SET 
  nombre = IFNULL(dieta_nombre, nombre), 
  tipo_dieta = IFNULL(dieta_tipo, tipo_dieta), 
  Url_image = IFNULL(dieta_Url_image, Url_Image)
WHERE id_dieta = dieta_id$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `editar_rutina` (IN `rutina_id` INT(11), IN `rutina_nombre` VARCHAR(25), IN `rutina_tipo` VARCHAR(25), IN `rutina_descripcion` TEXT, IN `rutina_url_image` TEXT)   UPDATE rutina SET 
  nombre = IFNULL(rutina_nombre, nombre), 
  tiporutina = IFNULL(rutina_tipo, tiporutina), 
  descripcion = IFNULL(rutina_descripcion, descripcion), 
  URL_Image = IFNULL(rutina_url_image, URL_Image)
WHERE id_rutina = rutina_id$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `eliminar_alimento_dieta` (IN `dieta_id` INT(11), IN `dieta_nombre` VARCHAR(50), IN `dieta_medida` VARCHAR(50), IN `dieta_cantidad` INT(5))   DELETE FROM dietasalimentos WHERE id_dieta = dieta_id AND nombre = dieta_nombre AND medida = dieta_medida AND cantidad = dieta_cantidad$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `eliminar_dieta` (IN `dieta_id` INT(11))   DELETE FROM dieta WHERE id_dieta = dieta_id$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `eliminar_ejercicio_rutina` (IN `rutina_id` INT(11), IN `ejercicio_id` INT(11))   DELETE FROM rutinaejercicio WHERE id_rutina = rutina_id AND id_ejercicio = ejercicio_id$$

CREATE DEFINER=`goatech`@`%` PROCEDURE `eliminar_rutina` (IN `rutina_id` INT(11))   DELETE FROM rutina WHERE id_rutina = rutina_id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_obj` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `administrador`
--

INSERT INTO `administrador` (`id_admin`, `id_usuario`, `id_obj`) VALUES
(2, 37, 3),
(3, 35, 3);

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
(21, 1, '2023-03-30 01:23:18', '2023-03-27', 1, ' Me gusto mucho lo que hice', ' No agregó comentarios'),
(21, 1, '2023-03-30 01:28:07', '2023-03-28', 5, ' Pierna', 'No siento las piernas '),
(21, 1, '2023-03-30 01:28:46', '2023-03-29', 5, ' Brazo', ' No agregó comentarios'),
(21, 1, '2023-04-20 20:57:26', '2023-04-01', 3, ' Hola', 'No agregó comentarios'),
(21, 1, '2023-04-21 01:10:56', '2023-02-15', 5, 'Doppio', 'Doppio'),
(21, 3, '2023-04-12 19:01:27', '2023-04-12', 5, ' Hola', '             Las pude hacer todas y termine muy cansado pero me senti muy bien'),
(21, 5, '2023-04-24 02:32:47', '2023-04-07', 1, 'asdfasfd', 'asfsad'),
(25, 1, '2023-04-20 01:44:50', '2023-04-12', 2, '   uidhthdiueuid', '   dhthb'),
(27, 1, '2023-04-24 21:07:34', '2023-04-24', 2, ' Pecho y Espalda', 'Hola'),
(27, 1, '2023-04-25 01:54:42', '2023-04-11', 4, 'Pierna', 'No agregó comentarios'),
(53, 1, '2023-04-24 18:03:30', '2023-04-18', 2, 'nuibibu', 'inui'),
(54, 1, '2023-04-24 17:52:49', '2023-04-18', 2, 'dfghj', 'vjfj'),
(57, 1, '2023-04-24 19:06:21', '2023-04-20', 3, 'daosbaiu', 'ajnaj'),
(57, 1, '2023-04-24 19:08:30', '2023-04-26', NULL, 'Hola', 'No agregó comentarios'),
(62, 1, '2023-04-26 17:06:26', '2023-04-26', 5, ' Probé la página desplegada jujuju', ' Funciona bien :D');

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
  `fecha_nacimiento` date DEFAULT NULL,
  `alturaInic` float(3,2) DEFAULT NULL,
  `pesoInic` float(4,1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_usuario`, `id_rutina`, `id_dieta`, `id_obj`, `id_niv`, `sexo`, `fecha_nacimiento`, `alturaInic`, `pesoInic`) VALUES
(1, 1, 8, 5, 3, 1, NULL, '0000-00-00', NULL, NULL),
(21, 25, NULL, 32, 3, 2, 'M', '2003-04-09', 1.70, 70.0),
(25, 36, 6, NULL, 3, 3, NULL, '0000-00-00', NULL, NULL),
(27, 38, NULL, NULL, 3, 3, 'M', '2001-07-05', NULL, NULL),
(29, 40, NULL, NULL, 1, NULL, NULL, '0000-00-00', NULL, NULL),
(50, 179, NULL, NULL, 2, NULL, 'F', '2023-04-07', 9.99, 80.0),
(51, 180, NULL, NULL, 2, NULL, 'M', '2002-11-15', 9.99, 80.0),
(52, 181, NULL, NULL, 2, NULL, 'F', '2023-04-20', 9.99, 80.0),
(53, 182, NULL, NULL, 2, 2, 'F', '2023-04-21', 9.99, 80.0),
(54, 183, NULL, NULL, 1, 2, 'M', '2023-04-19', 2.00, 1.0),
(55, 184, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 185, NULL, NULL, 2, 2, 'M', '2023-04-21', 9.99, 80.0),
(57, 186, NULL, NULL, 2, 2, 'F', '2023-04-27', 9.99, 80.0),
(58, 187, NULL, NULL, 3, 1, 'F', '1931-02-24', -4.00, 4.0),
(59, 188, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(60, 189, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(61, 190, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(62, 224, NULL, 4, 2, 3, 'F', '2023-04-06', 1.63, 80.0),
(63, 225, NULL, NULL, 3, 4, 'M', '2003-06-01', 1.73, 63.0),
(64, 226, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(65, 227, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(66, 228, NULL, 1, 1, 3, 'M', '2023-04-19', 1.39, 50.0),
(67, 229, NULL, NULL, 2, 2, 'F', '2023-04-26', 1.50, 63.0),
(68, 230, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
(21, 1, '2023-04-20', 100.0),
(21, 2, '2023-03-24', 10.0),
(21, 2, '2023-03-29', 999.9),
(21, 2, '2023-04-14', 1.6),
(21, 2, '2023-04-20', 30.0),
(21, 3, '2023-03-24', 10.0),
(21, 3, '2023-03-28', 999.9),
(21, 3, '2023-03-29', 999.9),
(21, 3, '2023-04-20', 1.0),
(21, 4, '2023-03-24', 10.0),
(21, 4, '2023-03-28', 10.0),
(21, 4, '2023-03-29', 999.9),
(21, 4, '2023-04-12', 33.0),
(21, 4, '2023-04-17', 1.0),
(21, 4, '2023-04-20', 100.0),
(21, 5, '2023-03-24', 10.0),
(21, 5, '2023-03-29', 999.9),
(21, 5, '2023-04-20', 30.0),
(21, 6, '2023-03-24', 10.0),
(21, 6, '2023-03-29', 999.9),
(21, 6, '2023-04-12', 1.8),
(21, 6, '2023-04-20', 100.0),
(21, 7, '2023-03-24', 10.0),
(21, 7, '2023-03-29', 999.9),
(21, 7, '2023-04-12', 0.7),
(21, 7, '2023-04-20', 99.0),
(21, 8, '2023-03-24', 10.0),
(21, 8, '2023-03-29', 999.9),
(21, 8, '2023-04-20', 25.0),
(21, 9, '2023-03-24', 10.0),
(21, 9, '2023-03-29', 67.0),
(21, 9, '2023-04-20', 60.0),
(21, 10, '2023-03-24', 71.1),
(21, 10, '2023-03-29', 999.9),
(21, 10, '2023-04-12', 60.0),
(21, 10, '2023-04-20', 999.9),
(21, 11, '2023-03-24', 10.0),
(21, 11, '2023-03-29', 999.9),
(21, 11, '2023-04-12', 1.0),
(21, 11, '2023-04-20', 540.0),
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
(27, 1, '2023-04-13', 30.0),
(27, 2, '2023-03-30', 876.0),
(27, 2, '2023-04-13', 1.6),
(27, 3, '2023-03-30', 7.0),
(27, 3, '2023-04-14', 9.0),
(27, 4, '2023-03-30', 20.0),
(27, 4, '2023-04-13', 27.0),
(27, 4, '2023-04-26', 50.0),
(27, 4, '2023-04-30', 40.0),
(27, 5, '2023-03-30', 9.0),
(27, 6, '2023-03-30', 10.0),
(27, 7, '2023-03-30', 11.0),
(27, 7, '2023-04-13', 23.0),
(27, 8, '2023-03-30', 12.0),
(27, 9, '2023-03-30', 13.0),
(27, 10, '2023-03-30', 14.0),
(27, 11, '2023-03-30', 15.0),
(62, 1, '2023-04-26', 8.0),
(62, 2, '2023-04-26', 5.0),
(62, 3, '2023-04-26', 2.0),
(62, 4, '2023-04-26', 1.0),
(62, 5, '2023-04-26', 4.0),
(62, 6, '2023-04-26', 11.0),
(62, 7, '2023-04-26', 10.0),
(62, 8, '2023-04-26', 6.0),
(62, 9, '2023-04-26', 7.0),
(62, 10, '2023-04-26', 9.0),
(62, 11, '2023-04-26', 3.0);

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
(26, 'Pollo Pollo 4', '', 33, 35, ''),
(27, 'Frutas ricas', '', 34, 36, ''),
(28, 'Dieta chida chidoris', '', 35, 37, ''),
(29, 'Dieta cool', '', 36, 38, ''),
(30, 'Dieta de pruebarrrrrrrrrr', '', 37, 39, ''),
(31, 'Dieta1', '', 38, 40, ''),
(32, 'Pollo y Ensalada', '', 39, 41, ''),
(34, 'friiiiijoles', '', 41, 43, '');

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
(4, 26, 'Pollo', 'Kilogramos', 10),
(5, 27, 'Mando', 'Gramoooos', 2),
(6, 28, 'Alimento chido', 'Medida chida', 10),
(7, 29, 'Higo', 'Piezaaas', 5),
(8, 30, 'Frijoloooooooooooooooooooooooooooooooooooooooooooo', 'Miligramo', 235),
(9, 31, 'Arroz', 'Gramo', 234),
(10, 32, 'Pollo', 'Piezas', 10),
(11, 32, 'Zanahoria', 'Piezas', 5),
(12, 32, 'Tomate', 'Piezas', 5),
(13, 32, 'Ensalada', 'Gramos', 500),
(14, 32, 'Lechuga', 'Gramos', 200),
(16, 34, 'habichuela', 'granos', 3),
(17, 34, 'Manzana', 'Unidad', 3);

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
(21, 1),
(25, 1),
(25, 9),
(51, 1),
(53, 1),
(56, 1),
(57, 1);

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
(3, 'Abdominal', 'Ejercicio que trabaja la area kdhoekth.ikuohti euthieuhtkieuthkieutijhdewhxjmhmwbk xjkmw bjkx kjw', ''),
(4, 'Remo', '', 'Video demostrativo'),
(5, 'Plancha', '', 'Video demostrativo'),
(6, 'Sentadillas', '', 'Video demostrativo'),
(7, 'Dominadas', 'Ejercicio que consiste en poner tus manos sobre la banca y flexionar las codos para estimular la zona del tricep', 'Video demostrativo'),
(8, 'Press de pecho', '', 'Video demostrativo'),
(9, 'Martillos', 'Ejercicio que consiste en usar mancuernas, fijar los codos y mover los antebrazos hacia arriba sin mover los codos', 'Video demostrativo'),
(10, 'Elevaciones de piernas', '', 'Video demostrativo'),
(11, 'Caminadora', '', 'Video demostrativo'),
(12, 'Bicicleta de piso', '', 'Video demostrativo'),
(13, 'Extension de tricep', '', 'Video demostrativo'),
(15, 'Press Militar', '', 'Video demostrativo'),
(16, 'Peso Muerto', '', 'Video demostrativo'),
(17, 'Remo invertido', '', 'Video demostrativo'),
(18, 'Apertura de pecho', '', 'Video demostrativo'),
(19, 'Cristos', '', 'Video demostrativo'),
(20, 'Cruce de Polea', '', 'Video demostrativo'),
(21, 'sentar', '', 'Video demostrativo'),
(22, 'bulgarian split squad', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(107, 'Micheal', '', 'https://www.youtube.com/embed/n3qQtSRmHxo'),
(112, 'volar', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(129, 'Ab', 'euidht', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(130, 'aeli', 'ueuteonuhoetnuhtnoeuhnothnouhontuhneotuhntuhnotuhnuhonuonuhonthtnehuetunoebjbhobnebueothtnohutohuntountohutnohunthunto uthtnuheont uhontu oenhuneto ntoh ntoeh untoe untoeh unoeh unoeh untoehntoeunt oentuhentu otunt hunoth une unoh unote huo', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(131, 'al', 'uidh567', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
(132, 'Squats', 'Sentar', 'https://www.youtube.com/embed/BjixzWEw4EY'),
(133, 'Squatss', 'sssue', 'https://www.youtube.com/embed/U7cGjV37rbk'),
(134, 'aaaaaaaaáoeuihduiuihdthiduiuihdtiufheidh', 'aaaaehduhtdihtithithithithithithithiththithithithihtithdthdntd', 'https://www.youtube.com/embed/WnoCFnIiQHw'),
(136, 'Press Frances', 'Un ejercicio chido', 'https://www.youtube.com/embed/PTO862T8U7Y'),
(138, 'ejercicio x', 'este tiene 4 series 3 repeticiones', 'https://www.youtube.com/embed/WnoCFnIiQHw'),
(139, 'aaaa', 'aaa', ''),
(141, 'aaaxaxa', 'aaa', 'https://www.youtube.com/embed/WnoCFnIiQHw'),
(142, 'hhe', 'ehe', 'https://www.youtube.com/embed/PTO862T8U7Y'),
(143, 'pez frances', 'pez', ''),
(144, 'ála', 'ala', 'https://www.youtube.com/embed/PTO862T8U7Y'),
(145, 'euidhthdiuxbhtgfyuxdhtcgfiujkxhdiudhdiuj', 'iudhqeuidhdiujeukidhthdiujidhthdiujkidhthdiueuidhdiueuidthiduijddthiduijdkhdthiudjkihdthiduijqjihdixjkqjxkbxwmkxbjkmkjbxkmxkxjkbmxkbxkmbxkmjxjbxjbxbjjbxjbjbxjbxjbxjxjbxjbjxbbbxjbxjbjbx', ''),
(146, 'aaaaaaaaxaxxa', 'dededededieohektheudtheudneuhkdenhtduendeuntudenudoentudoenudntuoetnhduoenudnudontdondoudonudndunudnednedkhnteidtdhuduhkdhtdkhdkhudkuhkdhdhdkuhdkhudhdkhkdhjkdhkdhkdhkdhjkdjkjkjkjkujkjkjkkdkhedkhedkthdkthdtkhexkthjxthkxjkth djthd thjqdc uexk', ''),
(148, 'bb', 'kok jtnkhneukhnotkhntohkntohknthkeuntkeokokkokoekoekoekokbhxdkuqhttnkdtuhutueodktnukdntouontkdontontko', ''),
(149, 'ave', 'thdtehnththutenhtuhehnsuthdnehdhionehandinohsatdhpinuhndihnhuidhneuhanhutnohdtoeuidheuidheuidejukixdiueuiiuiiuuixixxxkxddududududududududu', ''),
(150, 'bbbbb', 'b', ''),
(151, 'b', 'thkhbtnkutbnkutnbkuntkuntbntbmkntb kntbk untb knmbnmb nmntbkunmbukxmkubnmtkubtnkumnbumbntbmkwmbnxuknmbkunmbknmbk entmbe ktnmb ekntbmek ntmbek btnmek nbtm eknmb eknbtmk btn kenbt ke', 'https://www.youtube.com/embed/WnoCFnIiQHw'),
(152, 'ababababa', 'ababba', ''),
(153, 'aprue', 'a', 'https://www.youtube.com/embed/iQ3g-gqKe_A'),
(157, 'juutuut', 'keueue', '');

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
(33, 0, 0, 0, 0),
(34, 234, 124, 423, 244),
(35, 27, 19, 29, 40),
(36, 2354, 2147483647, 2147483647, 2147483647),
(37, 324325323, 2147483647, 3523525, 2147483647),
(38, 242, 423423, 3423, 4234),
(39, 1000, 95, 142, 95),
(40, 4000, 1, 1, 1),
(41, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `medicion`
--

CREATE TABLE `medicion` (
  `id_medicion` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `medicion`
--

INSERT INTO `medicion` (`id_medicion`, `tipo`) VALUES
(1, 'Cuello'),
(2, 'Pecho'),
(3, 'Brazo Izquierdo'),
(4, 'Brazo Derecho'),
(5, 'Cintura'),
(6, 'Pierna Izquierda'),
(7, 'Pierna Derecha'),
(8, 'Pantorrilla Izquierda'),
(9, 'Pantorrilla Derecha'),
(10, 'Peso'),
(11, 'Cadera');

-- --------------------------------------------------------

--
-- Table structure for table `micronutrientes`
--

CREATE TABLE `micronutrientes` (
  `id_micro` int(11) NOT NULL,
  `ceniza` int(5) DEFAULT NULL,
  `fibra_total` int(5) DEFAULT NULL,
  `calcio` int(5) DEFAULT NULL,
  `fosforo` int(5) DEFAULT NULL,
  `hierro` int(5) DEFAULT NULL,
  `tiamina` int(5) DEFAULT NULL,
  `riboflavina` int(5) DEFAULT NULL,
  `niacina` int(5) DEFAULT NULL,
  `vit_c` int(5) DEFAULT NULL,
  `vit_a` int(5) DEFAULT NULL,
  `acgrasosmin` int(5) DEFAULT NULL,
  `acgrasospoli` int(5) DEFAULT NULL,
  `acgrasossat` int(5) DEFAULT NULL,
  `colesterol` int(5) DEFAULT NULL,
  `potasio` int(5) DEFAULT NULL,
  `sodio` int(5) DEFAULT NULL,
  `zinc` int(5) DEFAULT NULL,
  `magnesio` int(5) DEFAULT NULL,
  `vit_b6` int(5) DEFAULT NULL,
  `vit_b12` int(5) DEFAULT NULL,
  `acfolico` int(5) DEFAULT NULL,
  `folatoeq` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `micronutrientes`
--

INSERT INTO `micronutrientes` (`id_micro`, `ceniza`, `fibra_total`, `calcio`, `fosforo`, `hierro`, `tiamina`, `riboflavina`, `niacina`, `vit_c`, `vit_a`, `acgrasosmin`, `acgrasospoli`, `acgrasossat`, `colesterol`, `potasio`, `sodio`, `zinc`, `magnesio`, `vit_b6`, `vit_b12`, `acfolico`, `folatoeq`) VALUES
(1, 4523, 1253, 1234, 3728, 32, 123, 2, 3, 4, 9, 293, 345, 2352, 3552, 23, 2124, 2344, 21, 232, 6, 23, 24),
(2, 234, 312, 23, 56, 789, 847, 234, 2134, 234, 25, 493, 954, 34, 492, 4953, 2948, 244, 234, 34, 43, 54, 4),
(3, 234, 324, 2345, 345, 234, 35, 234, 345, 34, 345, 3521, 3, 352, 35, 76, 45, 67, 86, 53, 32, 34, 2),
(4, 234, 4324, 234, 2342, 234, 3452, 444, 20, 436, 542, 432, 342, 234, 345, 34, 10, 231, 12, 35, 235, 11, 54),
(5, 35, 18, 1482, 2156, 19, 1, 3, 24, 37, 2272, 27, 18, 29, 866, 3994, 1782, 16, 485, 2, 4, 389, 23),
(6, 35, 32, 54, 235, 324, 23, 35, 67, 43, 6563, 35, 45, 23, 23, 54, 54, 34, 23, 65, 34, 4, 543),
(7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22),
(8, 34, 44, 35, 4, 34, 3, 444, 4, NULL, NULL, 34, NULL, 234, NULL, 234, 424, NULL, 53, 98, 20, 21, 22),
(9, NULL, 345, NULL, 9, 10, 54, 77, 24, 65, 90, 3, 4, 7, 8, 9, 10, 21, 68, 46, 23, 57, 45),
(10, 9, 24, 345, 332, 366, 37, 43, 54, 44, 348, 34, 66, 346, 45, 656, 545, 46, 43, 76, 45, 2, 55),
(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3),
(13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(16, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(17, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(18, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(19, 1, 11, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0),
(20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(24, -20, -20, -20, -20, -20, -20, -20, -20, -20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(26, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0),
(27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(33, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(36, 2147483647, 2147483647, 2, 0, 3, 2, 8, 9, 7, 4, 7, 8, 9, 11, 2147483647, 56, 44, 88, 4, 2, 5, 2),
(37, 1, 1, 6, 0, 25, 15, 15, 21, 14, 16, 18, 21, 19, 28, 10, 7, 11, 16, 13, 13, 16, 16),
(38, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(39, 2147483647, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(40, 0, 2, 0, 0, 0, 7, 26, 642, 46, 64, 46, 46, 64, 46, 56, 54, 5, 9, 0, 0, 10, 0),
(41, 21, 32, 53, 61, 39, 17, 26, 0, 29, 28, 43, 37, 34, 47, 46, 12, 16, 38, 37, 34, 37, 40),
(42, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(43, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

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
(1, 'pecho_duro', 'pechito', 'Pecho para tenerlo duro', 'https://fnsi.com.mx/wp-content/uploads/2020/06/GYM-17-1024x731.jpg'),
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
(34, 'Carlitos', '', 'Carlitos', '1680899167153-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(35, 'Holis', '', 'Holis', '1680899456684-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(36, '2525', '', '25', '1680899539198-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(37, 'Hola', 'Bajar de Peso', 'Hola', '1680901104102-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(38, 'Hola', 'Bajar de Peso', 'Hola', '1680901466465-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(39, 'Carlitos', 'Subir de Peso', 'Carlitos', '1680901546358-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(40, 'Mi Rutina Loca', 'Mantener Peso', 'Rutina chida', '1680902521418-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(41, 'Sebas', 'Subir de Peso', 'Sebas', '1681142895437-download.jfif'),
(42, 'Rutina poderosa', 'Mantener Peso', 'Rutina donde vas a tener un cuerpower', '1681836183050-Cuerpower.jpg'),
(44, 'Yoga', 'Mantener Peso', 'Mind-fullness', '1681941179609-yoga-0.jpg'),
(45, 'Rutina bien padre para tí', 'Bajar de Peso', 'Hola', '1681941927028-IMG_20230115_103736.jpg'),
(47, 'Charlie', 'Subir de Peso', 'Hola', ''),
(48, 'Charlie', 'Mantener Peso', 'a', ''),
(49, 'Charlie', 'Bajar de Peso', 'Charlie', ''),
(50, 'Doppio', 'Subir de Peso', 'Doppio', ''),
(51, 'Doppio20', 'Bajar de Peso', 'Doppio20', ''),
(52, 'Doppio20', 'Subir de Peso', 'Doppio20', ''),
(53, 'Doppio20', 'Bajar de Peso', 'Doppio20', ''),
(54, 'Doppio2020', 'Bajar de Peso', 'Doppio20', ''),
(55, 'Rutinaaaaaaaaaaaaaaaaaaaa', 'Bajar de Peso', 'Rutina bonita', ''),
(56, 'Rutina perronsísima', 'Bajar de Peso', 'er', '1681968945370-IMG_20230115_103806.jpg'),
(57, 'Rutina pierna', 'Bajar de Peso', 'ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', '1682023925723-ejercicios-para-mejorar-la-flexibilidad.jpg'),
(58, 'La Rutina de Charlie', 'Subir de Peso', 'Explicacion de la rutina', '1682045498305-Planet-Fitness-un-gimnasio-en-QuerÃ©taro-hecho-a-tu-medida.jpg'),
(59, 'Rutina nueva', 'Mantener Peso', 'Nueva rutina', '1682446973943-IMG_20230115_103736.jpg'),
(60, 'Rutina prueba 2', 'Subir de Peso', 'Rutina', ''),
(61, 'Rutina prueba 4', 'Bajar de Peso', 'R', '1682447985252-IMG_20230115_104446.jpg');

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
(41, 37, 3),
(42, 40, 3),
(43, 41, 3),
(44, 42, 2),
(45, 42, 3),
(46, 42, 15),
(50, 44, 12),
(51, 44, 11),
(52, 44, 3),
(53, 44, 19),
(54, 45, 22),
(58, 54, 3),
(59, 54, 9),
(60, 54, 11),
(61, 55, 129),
(62, 56, 18),
(63, 57, 12),
(64, 58, 11),
(65, 58, 12),
(66, 58, 3),
(67, 59, 149),
(68, 60, 143),
(69, 61, 3),
(71, 34, 16),
(72, 34, 16);

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
(21, 5),
(25, 6);

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `nombre_usuario` varchar(40) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `contrasena` varchar(400) NOT NULL,
  `foto_perfil` mediumtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `nombre_usuario`, `correo`, `contrasena`, `foto_perfil`) VALUES
(1, 'José', 'Pérez', 'joseperez', 'joseperez@gmail.com', 'jose013', NULL),
(2, 'Mariana', 'González', 'mariana.gonzalez', 'mariana.gonzalez@gmail.com', 'coutmariti01', NULL),
(3, 'Nashun', 'Wang', 'wang0123', 'wang@gmail.com', 'extrañojapon', NULL),
(4, 'Mariano', 'Vega', 'marianov', 'marianov@gmail.com', 'hogema01_', NULL),
(5, 'Vanessa', 'Lanz', 'vlanz01', 'lanz@gmail.com', 'unicorniofeliz', NULL),
(6, 'Héctor', 'Torres', 'hectortorres', 'hectortorres@gmail.com', 'torresgemelas', NULL),
(8, 'Sofia', 'Garcia', 'sofigarcia', 'sofigarcia@gmail.com', 'Cg#1fQm*', NULL),
(9, 'Lucas', 'Rodriguez', 'luquitasrodri', '', 'p9XhKd$r', NULL),
(10, 'Ana', 'Perez', 'ana.perez', 'ana.perez@gmail.com', 'E#7LjFt*', NULL),
(11, 'Daniel', 'Ramirez', 'daniramirez', 'dani.ramirez@gmail.com', 'b4NkM@5x', NULL),
(12, 'Valeria', 'Torres', 'valetorres', 'vale.torres@gmail.com', 'T2y@5DgH', NULL),
(13, 'Juan', 'Hernandez', 'juanhernandez', 'juan@gmail.com', 'Rf@8GtS2', NULL),
(14, 'Isabella', 'Gonzalez', 'isagonzalez', 'isagonzalez@gmail.com', 'q6Wx#7sK', NULL),
(15, 'Andres', 'Castro', 'andres.castro', 'andres.castro@gmail.com', 'P#3vH8dZ', NULL),
(16, 'Camila', 'Sanchez', 'camila.sanchez', 'camila.sanchez@gmail.com', 'A5z*9tRq', NULL),
(17, 'Leonardo', 'Lopez', 'leolopez', 'leolopez@gmail.com', 'V8b#4mFp', NULL),
(18, 'Carla', 'Martinez', 'carlamartinez', 'carlamartinez@gmail.com', 'S@1dN6tJ', NULL),
(19, 'Tomas', 'Diaz', 'tomasdiaz', 'tomasdiaz@gmail.com', 'V8b#4mFp', NULL),
(20, 'Lucia', 'Ortiz', 'luciaortiz', 'luciaortiz@gmail.com', 'G#9nH4jK', NULL),
(25, 'Carlos', 'Velasco', 'Carlos123', 'carlos@carlos.com', '$2a$12$KWLqReEuXZ9ijV4zYX3pp.9vAmmTTOnCHfyn81sNFjaIikmgarrq.', '1682561918862-chat noir.jpg'),
(35, 'Diego ', 'Perdomo Salcedo', 'doppio20', 'A01709150@tec.mx', '$2a$12$OdwDbRpqAsKy4tNNY6zzCueejYjD1LPJZv3cfN5mI20fRvG7ftz7m', NULL),
(36, 'Diego2', 'Perdomo Salcedo', 'doppio21', 'perdomodiego@gmail.com', '$2a$12$vlEzRAsZpTNQP./Q0aMxhuwBPXrwdnNGblylmJ3xqK1Wo0.cpUa2i', NULL),
(37, 'Mafer', 'Moreno', 'mafermoreno', 'mafermoreno@gmail.com', '$2a$12$d/FEvd.RpBREd5gt6ubTEeYTHs3FR4bHb3IMxmNk5qcaDxg600gkO', NULL),
(38, 'Julio ', 'Perez', 'Julio', 'julio@gmail.com', '$2a$12$FODE2L8QIX/DMHHuECZ/2OoF8ZXJs/uqYCJL27x4bh5gmmxlbd1i6', NULL),
(40, 'Monica Andrea', 'Ayala Marrero', '', 'monica@gmail.com', '$2a$12$9uODZFAHebJm7fQmXES0SOs.DVmbnBa.Xzp0e.zEa.MuZsBDFrWxC', NULL),
(179, 'a', 'a', 'a', 'a@gmail.com', '$2a$12$.ddnkmSpeX9FhvPjOu6ppuv/HogO7BS2ZnHB/Pm6fWs6QXeLNIxqq', NULL),
(180, 'Uri', 'Gopar', 'urigopar', 'gopar@gmail', '$2a$12$LlY/baZTbKhQo7evHelceuveoCfbmRN3v4BCMBgJmrtRO/QIXTL0K', NULL),
(181, 'b', 'b', 'b', 'b@gmail.com', '$2a$12$mYysqKGuFu1nz3eLocuL9evL3UprS0mcCHon9Y2gAvR0Pnm.paiwW', NULL),
(182, 'c', 'c', 'c', 'c@gmail', '$2a$12$/rDGv4.5yHmM0j7K5ywo/eJ3TXBiyXG7z6dNXk4hGhK7lDpqmbmaW', NULL),
(183, 'pi', 'pi', 'pi', 'p@gmail.com', '$2a$12$u17X2trmMCImNNf/RjUZ7eDdsgd8ajy35fJB5255/Xm4ITJkqRW4y', NULL),
(184, 'h', 'h', 'h', 'h@gmial.com', '$2a$12$mKKzcQNVoo3K1f6C0kJizuHPCaHiScs1JRlG9yeItfommvdNHxJni', NULL),
(185, 'yo', 'g', 'yo', 'yo@gmail.com', '$2a$12$ssHP/Ct1HX72mTVCyVkFn.ZDv1Fcdg4DFX9tIMk9OvLU2BRfaYcs2', NULL),
(186, 'Prueba', 'Prueba', 'prueba', 'prueba@gmail.com', '$2a$12$iWAt2QYPn2GNjYT7XkxIZObyRZ55ywbZeGwd9fnbRtzvNb.ffxLb6', NULL),
(187, 'banana', 'banana', 'banana', 'banana@gmail.com', '$2a$12$iYOWviP31le0l2OB9dALJuXUpR3i4VPWEWLovp0cVzDi/euhTGKeS', NULL),
(188, 'u', 'g', 'u', 'u@gmail', '$2a$12$fg0CGRp.ldjiwSEKuYjjw.G7JKrpVnHDEDMa7bkf5TaWVS1Idm/xy', NULL),
(189, 'ee', 'e', 'ee', 'e@gamil.com', '$2a$12$XB7om2vY7lNcqe.DL12Lnuzweqqq9UH9YxPTGmt3Fd8EaBnNAbyF.', NULL),
(190, 'u', 'u', 'w', 'we@gmail.com', '$2a$12$hMQw1gx/DktiK7YSRNxN2.0PC9XqZ.JbmjWR12OwTtXmGcC27iwQy', NULL),
(224, 'Ramona', 'Najera', 'RamonaNF', 'ramona@hotmail.com', '$2a$12$joPqSLkjbOLOUt7yDjB9Tu0xeHxyO6Xaq.RU7c1lVogzvEEuqpdLC', '1682537768776-WhatsApp Image 2023-04-26 at 1.35.20 PM.jpeg'),
(225, 'Armando', 'Rosas', 'MisterAce', 'armando@gmail.com', '$2a$12$fePeG/f9I30ptqDLOOWq5.jd7UrFDWR/LuXx9g4ZZMxNUzn9GNoD2', '1682533551056-113733780 (1).jfif'),
(226, 'Leslie', 'Gomez', 'leslie', 'leslie@gmail', '$2a$12$QccP.pW.Z1QeSCD7pRZBjuSggnDsFe1RVL0A4NxU5EsI4snQzKm6O', NULL),
(227, 'hola', 'hola', 'hola', 'hola@gmailcom', '$2a$12$zGtdqdshSAXNAjmrriNUwOiNT2RS/F9/RNm6H.phQdkv15teBIdxy', NULL),
(228, 'hola', 'hola', 'hols', 'hols@gmail.com', '$2a$12$m.fGpwN.Dl5O8dH5nPts6e58ANiKmQjRN2RHheFouesIQWcAuNPza', NULL),
(229, 'Ivana', 'Pear', 'ivana', 'ivana@gmail', '$2a$12$BLZPN6ZXn2iQPhkWW5Zc9.1NRx3/m7zuB8ia4MuxuV0J83cLgPjcO', NULL),
(230, 'ghj', 'ghj', 'ghj', 'ghj@gmail.com', '$2a$12$Xn2Az2jDnXbJ4cNaLlSC4.6Dq1r74YxTkF0KgIDGRSV4RH7wqNXre', NULL);

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
(35, 2, '2023-04-18 16:36:47'),
(36, 1, '2023-04-18 16:36:47'),
(37, 2, '2023-04-18 16:36:47'),
(38, 1, '2023-04-18 16:36:47'),
(40, 1, '2023-04-18 16:36:47'),
(179, 1, '2023-04-24 01:24:42'),
(180, 1, '2023-04-24 14:27:45'),
(181, 1, '2023-04-24 14:51:58'),
(182, 1, '2023-04-24 15:07:59'),
(183, 1, '2023-04-24 15:51:29'),
(184, 1, '2023-04-24 16:07:20'),
(185, 1, '2023-04-24 16:54:32'),
(186, 1, '2023-04-24 17:05:38'),
(187, 1, '2023-04-24 17:15:00'),
(188, 1, '2023-04-25 02:49:12'),
(189, 1, '2023-04-25 02:58:31'),
(190, 1, '2023-04-25 03:24:57'),
(224, 1, '2023-04-25 19:43:06'),
(225, 1, '2023-04-25 21:56:12'),
(226, 1, '2023-04-25 22:26:30'),
(227, 1, '2023-04-26 18:43:36'),
(228, 1, '2023-04-26 19:03:40'),
(229, 1, '2023-04-26 21:51:42'),
(230, 1, '2023-04-27 03:06:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_obj` (`id_obj`);

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
  ADD UNIQUE KEY `id_usuario_2` (`id_usuario`),
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
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario_unique` (`nombre_usuario`),
  ADD UNIQUE KEY `correo_unique` (`correo`),
  ADD UNIQUE KEY `id_usuario_unique` (`id_usuario`);

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
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `dieta`
--
ALTER TABLE `dieta`
  MODIFY `id_dieta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `dietasalimentos`
--
ALTER TABLE `dietasalimentos`
  MODIFY `id_dietaalimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `ejercicio`
--
ALTER TABLE `ejercicio`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `macronutrientes`
--
ALTER TABLE `macronutrientes`
  MODIFY `id_macro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `micronutrientes`
--
ALTER TABLE `micronutrientes`
  MODIFY `id_micro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
  MODIFY `id_rutina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `rutinaejercicio`
--
ALTER TABLE `rutinaejercicio`
  MODIFY `id_rutinaejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  ADD CONSTRAINT `administrador_ibfk_2` FOREIGN KEY (`id_obj`) REFERENCES `objetivo` (`id_obj`);

--
-- Constraints for table `bitacora`
--
ALTER TABLE `bitacora`
  ADD CONSTRAINT `bitacora_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `bitacora_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`) ON DELETE SET NULL ON UPDATE CASCADE,
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
  ADD CONSTRAINT `dietasalimentos_ibfk_1` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dietasfavoritas`
--
ALTER TABLE `dietasfavoritas`
  ADD CONSTRAINT `dietasfavoritas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `dietasfavoritas_ibfk_2` FOREIGN KEY (`id_dieta`) REFERENCES `dieta` (`id_dieta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rutinaejercicio`
--
ALTER TABLE `rutinaejercicio`
  ADD CONSTRAINT `rutinaejercicio_ibfk_1` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rutinaejercicio_ibfk_2` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicio` (`id_ejercicio`);

--
-- Constraints for table `rutinasfavoritas`
--
ALTER TABLE `rutinasfavoritas`
  ADD CONSTRAINT `rutinasfavoritas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `rutinasfavoritas_ibfk_2` FOREIGN KEY (`id_rutina`) REFERENCES `rutina` (`id_rutina`) ON DELETE CASCADE ON UPDATE CASCADE;

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
