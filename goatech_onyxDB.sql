-- phpMyAdmin SQL Dump
-- version 5.1.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-goatech.alwaysdata.net
-- Generation Time: Mar 09, 2023 at 05:35 PM
-- Server version: 10.6.11-MariaDB
-- PHP Version: 7.4.19

DROP DATABASE IF EXISTS goatech_onyxDB;
CREATE DATABASE goatech_onyxDB;
USE goatech_onyxDB;
--
-- Database: goatech_onyx
--

-- --------------------------------------------------------

--
-- Table structure for table Alimento
--

CREATE TABLE Alimento (
  id_alimento int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(25) NOT NULL,
  medida varchar(10) NOT NULL,

  PRIMARY KEY(id_alimento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Alimento VALUES
(1,'Manzana', 'Pieza'),
(2,'Nugget de pollo', 'Pieza'),
(3,'Papaya', 'Taza'),
(4,'Pollo', 'Gramo'),
(5,'Huevo', 'Pieza'),
(6,'Entomatadas', 'Pieza'),
(7,'Chuleta', 'Gramo'),
(8,'Tomates','Rebanada'),
(9,'Lechuga','Gramo'),
(10,'Pan Tostado','Rebanada'),
(11,'Carne de res','Gramo'),
(12,'Carne de Puerco','Gramo'),
(13,'Jamón','Gramo'),
(14,'Platano','Pieza'),
(15,'Pan dulce','Pieza'),
(16,'Azúcar','Cucharada'),
(17,'Sal','Cucharada'),
(18,'Crema de maní','Cucharada'),
(19,'Almendras','Gramo'),
(20,'Queso','Gramo'),
(21,'Claras de Huevo','Pieza'),
(22,'Frijoles','Gramo'),
(23,'Tortillas','Pieza'),
(24,'Aguacate','Pieza'),
(25,'Uvas','Pieza'),
(26,'Naranjas','Pieza'),
(27,'Agua','Mililitros'),
(28,'Pasta','Gramo'),
(29,'Aceite','Cucharada'),
(30,'Tostadas','Pieza'),
(31,'Leche de vaca','Mililitros'),
(32,'Leche de soya','Mililitros'),
(33,'Leche de como','Mililitros'),
(34,'Jugo de naranja','Mililitros'),
(35,'Jugo verde','Mililitros'),
(36,'Jugo de toronja','Mililitros'),
(37,'Toronja','Pieza'),
(38,'Aceite de oliva','Cucharada'),
(39,'Avena','Taza');

-- --------------------------------------------------------

--
-- Table structure for table Ejercicio
--

CREATE TABLE Ejercicio (
  id_ejercicio int(11) NOT NULL AUTO_INCREMENT,
  descripcion text NOT NULL,
  video_ejercicio text NOT NULL,

  PRIMARY KEY(id_ejercicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Ejercicio VALUES
(1,'Curt de bicep','link bonito'),
(2,'Lagartijas','link bonito'),
(3,'Abdominales','link bonito'),
(4,'Remo','link bonito'),
(5,'Plancha','link bonito'),
(6,'Sentadillas','link bonito'),
(7,'Dominadas','link bonito'),
(8,'Press de pecho','link bonito'),
(9,'Martillos','link bonito'),
(10,'Elevaciones de piernas','link bonito'),
(11,'Caminadora','link bonito'),
(12,'Bicicleta de piso','link bonito'),
(13,'Extension de tricep','link bonito'),
(14,'Fondos','link bonito'),
(15,'Press Militar','link bonito'),
(16,'Peso Muerto','link bonito'),
(17,'Remo invertido','link bonito'),
(18,'Apertura de pecho','link bonito'),
(19,'Cristos','link bonito'),
(20,'Cruce de Polea','link bonito');

-- --------------------------------------------------------

--
-- Table structure for table MacroNutrientes
--

CREATE TABLE MacroNutrientes ( -- Información cambiante
  id_macro int(11) NOT NULL AUTO_INCREMENT,
  calorias float(7,2) NOT NULL,
  proteinas float(7,2) NOT NULL,
  carbohidratos float(7,2) NOT NULL,
  grasas float(7,2) NOT NULL,

  PRIMARY KEY(id_macro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO MacroNutrientes VALUES
(1,2500.23,342.43,457.98,579.89),
(2,4346.3,533.02,5424.54,23),
(3,3324,245.43,23.54,345.34),
(4,1200,543.5,435,234),
(5,2353.23,432.4,343,345.3),
(6,3000,534.23,433.34,345.23),
(7,2000,345.23,345.43,234.53),
(8,53462.53,35934.02,59358.02,43850.34),
(9,0,0,0,0),
(10,438.34,2485.23,4403.23,434.23);

-- --------------------------------------------------------

--
-- Table structure for table Medición (Por definir)
--

CREATE TABLE Medicion ( -- Sólo existen 10 mediciones por el momento
  id_medicion int(11) NOT NULL AUTO_INCREMENT,
  tipo varchar(20) NOT NULL,

  PRIMARY KEY(id_medicion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Medicion VALUES
(1,'Cuello'),
(2,'Pecho'),
(3,'BrazoIzq'),
(4,'BrazoDer'),
(5,'Cintura'),
(6,'PiernaIzq'),
(7,'PiernaDer'),
(8,'PantorrillaIzq'),
(9,'PantorrillaDer'),
(10,'Peso');

-- --------------------------------------------------------

--
-- Table structure for table MicroNutrientes
--

CREATE TABLE MicroNutrientes ( -- Información cambiante
  id_micro int(11) NOT NULL AUTO_INCREMENT,
  ceniza float(5,1) DEFAULT NULL,
  fibra_total float(5,1) DEFAULT NULL,
  calcio float(5,1) DEFAULT NULL,
  fosforo float(5,1) DEFAULT NULL,
  hierro float(5,1) DEFAULT NULL,
  tiamina float(5,1) DEFAULT NULL,
  riboflavina float(5,1) DEFAULT NULL,
  niacina float(5,1) DEFAULT NULL,
  vit_c float(5,1) DEFAULT NULL,
  vit_a float(5,1) DEFAULT NULL,
  acgrasosmin float(5,1) DEFAULT NULL,
  acgrasospoli float(5,1) DEFAULT NULL,
  acgrasossat float(5,1) DEFAULT NULL,
  colesterol float(5,1) DEFAULT NULL,
  potasio float(5,1) DEFAULT NULL,
  sodio float(5,1) DEFAULT NULL,
  zinc float(5,1) DEFAULT NULL,
  magnesio float(5,1) DEFAULT NULL,
  vit_b6 float(5,1) DEFAULT NULL,
  vit_b12 float(5,1) DEFAULT NULL,
  acfolico float(5,1) DEFAULT NULL,
  folatoeq float(5,1) DEFAULT NULL,

  PRIMARY KEY(id_micro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO MicroNutrientes VALUES
(1,4523.1,1253.1,1234.2,3728.3,32.2,123.2,2.1,3,4,9.2,293,345.2,2352,3552.2,23,2124,2344,21,232,6,23,24),
(2,234.2,312,23,56,789,847.3,234.2,2134,234.2,25,493,954,34.3,492.3,4953,2948.3,244.4,234,34,43,54,4),
(3,234.2,324.2,2345.2,345,234.2,35.2,234.2,345.2,34.2,345.2,3521.3,3,352.2,35.2,76.3,45,67.4,86,53.4,32.1,34,2),
(4,234.2,4324.3,234.2,2342.3,234.2,3452.3,443.5,20.1,435.9,542.3,432.3,342.5,234.2,345.3,34.2,10.5,231.3,12.3,35.3,235.2,11.2,54.2),
(5,35.1, 17.7,1482.4,2156.4,18.9,1.4,2.9,23.7,37.2,2271.8,27.0,18.2,28.9,865.7,3993.7,1781.7,16.1,485.1,2.2,4.5,389.3,23),
(6,35,32,54,235.2,324.2,23.2,35,67,43.2,6563,35.3,45.3,23,23,54,54,34,23,65,34,4.3,543.3),
(7,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22),
(8,34.2,43.7,34.6,3.5,34.5,3.4,443.5,4,NULL,NULL,34,NULL,234,NULL,234.4,424.5,NULL,53.2,98.3,20,21,22),
(9,NULL,345.2,NULL,9.4,10.4,54.3,76.7,23.5,65.4,90.4,3.2,4.4,6.6,7.7,8.8,9.9,21.4,67.7,45.7,23.4,56.7,45),
(10,9.3,23.5,345.4,332.5,366.3,36.9,43,54.2,43.6,347.8,34,65.8,346,45.3,656.3,545.3,45.5,43,75.9,45.3,2.1,54.9),
(11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3);
-- --------------------------------------------------------

--
-- Table structure for table Nivel Fisico
--

CREATE TABLE NivelFisico ( -- Sólo existen 4 niveles por el momento
  id_niv int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(20) NOT NULL,
  descripcion text NOT NULL,

  PRIMARY KEY(id_niv)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO NivelFisico VALUES
(1,'Noob','Hace menos de 12 repeticiones,no sabe técnica'),
(2,'Beginner','Ya realiza 12 repeticiones'),
(3,'Intermediate','Realiza 12 repeticiones con pesos fuertes,buena técnica'),
(4,'Advanced','Pesos pesados con buena técnica');

-- --------------------------------------------------------

--
-- Table structure for table Objetivo
--

CREATE TABLE Objetivo ( -- Sólo existen 3 objetivos por el momento
  id_obj int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(20) NOT NULL,
  descripcion text NOT NULL,
   
  PRIMARY KEY(id_obj)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Objetivo VALUES
(1,'Bajar peso','Adelgaza y tonifica cuerpo'),
(2,'Mantener peso','Se mantiene el peso, pero genera musculo'),
(3,'Subir peso','Dieta rica en carbohidratos y calorías para subir el peso');
-- --------------------------------------------------------

--
-- Table structure for table Rol
--

CREATE TABLE Rol ( -- Sólo existen 2 roles por el momento
  id_rol int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(20) NOT NULL,
  descripcion text NOT NULL,

  PRIMARY KEY(id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Rol VALUES
(1,'Cliente','Usa la aplicación para poder alcanzar su meta en su vida fitness'),
(2,'Administrador','Gestiona la aplicación y asigna roles');

-- --------------------------------------------------------

--
-- Table structure for table Rutina
--

CREATE TABLE Rutina ( -- Información cambiante
  id_rutina int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(25) NOT NULL,
  tiporutina varchar(15) NOT NULL,
  descripcion text NOT NULL,

  PRIMARY KEY(id_rutina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Rutina VALUES
(1,'pecho_explosivo','pecho','Realizar un fuerte entrenamiento de pecho'),
(2,'Pierna_tonifcar','Pierna','realizar un leve entrenamiento'),
(3,'Bicep_cara','bicep','Realizar entrenamiento de fuerza con mancuernas'),
(4,'Pecho Alto','Pecho','Realizar entrenamiento de fuerza con barra'),
(5,'Pecho Medio','Pecho','Realizar entrenamiento de progresión'),
(6,'Pecho Bajo','Pecho','Realizar entrenamiento de fuerza con poleas'),
(7,'Tricep y Bicep','Tricep-bicep','Realizar entrenamiento de fuerza con mancuernas'),
(8,'Espalda y hombro','Espalda','Realizar entrenamiento de fuerza con mancuernas'),
(9,'Pecho y hombro','P y H','Aumento de fuerza'),
(10,'Espalda Baja','Espalda','Tonificar musculos bajos');

-- --------------------------------------------------------

--
-- Table structure for table Usuario
--

CREATE TABLE Usuario (
  id_usuario int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(30) NOT NULL,
  apellido varchar(30) NOT NULL,
  nombre_usuario varchar(15) NOT NULL,
  correo varchar(30) NOT NULL,
  contrasena varchar(15) NOT NULL,
  foto_perfil mediumtext DEFAULT NULL,
  sexo varchar(1) NOT NULL,
  fecha_nacimiento date NOT NULL,

  PRIMARY KEY(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Usuario VALUES
(1,'José','Pérez','josperez','jose01@gmail.com','jose013',NULL, 'M','2003/02/01'),
(2,'Mariana','González','mariangoz','marigonz@gmail.com','coutmariti01',NULL,'F','2001/04/02'),
(3,'Nashun','Wang','nwang','nashunwaang@gmail.com','extrañojapon',NULL,'M','1998/12/31'),
(4,'Mariano','Vega','marianoovega','vegamariiano@gmail.com','hogema01_',NULL,'M','1994/03/22'),
(5,'Vanessa','Lanz','enav_152003','enavlanz_01@gmail.com','unicorniofeliz',NULL,'F','2003/09/15'),
(6,'Héctor','Torres','hector.t24','hectortorres@gmail.com','torresgemelas',NULL,'M','2000/04/24'),
(7,'Uri','Gopar','uri_gopar','urigopar@gmail.com','gatitosarcoir01',NULL,'M','1995/03/21'),
(8,'Sofia','Garcia','sofiii_garcia','sofgarciia22@gmail.com','Cg#1fQm*',NULL,'F','1993/03/21'),
(9,'Lucas','Rodriguez','roddlucc','rognw012@gmail.com','p9XhKd$r',NULL,'M','1988/07/14'),
(10,'Ana','Perez','anappperez','ezanap@gmail.com','E#7LjFt*',NULL,'F','2001/11/03'),
(11,'Daniel','Ramirez','ramdan','ledanfer@gmail.com','b4NkM@5x',NULL,'M','1993/02/28'),
(12,'Valeria','Torres','valeria_torres','valeria.torres@example.com','T2y@5DgH',NULL,'F','1990/09/05'),
(13,'Juan','Hernandez','juan_hernandez','juan.hernandez@example.com','Rf@8GtS2',NULL,'M','2003/06/17'),
(14,'Isabella','Gonzalez','isabella_glez','isabella.gonzalez@example.com','q6Wx#7sK',NULL,'F','1998/04/23'),
(15,'Andres','Castro','andres_castro','andres.castro@example.com','P#3vH8dZ',NULL,'M','1996/01/30'),
(16,'Camila','Sanchez','camila_sanchez','camila.sanchez@example.com','A5z*9tRq',NULL,'F','1989/05/08'),
(17,'Leonardo','Lopez','leonardo_lopez','leonardo.lopez@example.com','V8b#4mFp',NULL,'M','2000/10/22'),
(18,'Carla','Martinez','carla_martinez','carla.martinez@example.com','S@1dN6tJ',NULL,'F','1998/04/23'),
(19,'Tomas','Diaz','tomas_diaz','tomas.diaz@example.com','V8b#4mFp',NULL,'M','2000/10/22'),
(20,'Lucia','Ortiz','lucia_ortiz','lucia.ortiz@example.com','G#9nH4jK',NULL,'F','1997/09/11');
-- --------------------------------------------------------

--
-- Table structure for table Dieta
--

CREATE TABLE Dieta ( -- No se tienen más tipos de dietas
  id_dieta int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(25) NOT NULL,
  tipo_dieta varchar(15) NOT NULL,

  id_macro int(11) NOT NULL,
  id_micro int(11) NOT NULL,

  -- ----------------------------------- 


  PRIMARY KEY(id_dieta),

  FOREIGN KEY(id_macro) REFERENCES MacroNutrientes(id_macro),
  FOREIGN KEY(id_micro) REFERENCES MicroNutrientes(id_micro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Dieta VALUES
(1,'Rico pollo','Aumento peso',1,1),
(2,'Pollo','Mantner peso',6,3),
(3,'Ensalada Cesar','Bajar peso',3,10),
(4,'Pescado','Mantener',4,12),
(5,'Dieta detox','Ganar masa',5,8),
(6,'Dieta Hipercalórica','Bajar peso',7,11),
(7,'Dieta hipocalórica','Subir peso',2,2),
(8,'Dieta Proteica','Ganar musculo',5,5),
(9,'Equelibrada','Mantener peso',2,7),
(10,'Dieta de Volumen','Aumentar peso',5,8);


-- --------------------------------------------------------

--
-- Table structure for table Cliente
--

CREATE TABLE Cliente (
  id_cliente int(11) NOT NULL AUTO_INCREMENT,

  id_rutina int(11) NOT NULL,
  id_dieta int(11) NOT NULL,
  id_obj int(11) NOT NULL,
  id_niv int(11) NOT NULL,

  -- ----------------------------------- 

  imc float(3,1) DEFAULT NULL, -- Atributo calculado, por ende, no se va a calcular aún

  PRIMARY KEY(id_cliente),
  
  FOREIGN KEY(id_rutina) REFERENCES Rutina(id_rutina),
  FOREIGN KEY(id_dieta) REFERENCES Dieta(id_dieta),
  FOREIGN KEY(id_obj) REFERENCES Objetivo(id_obj),
  FOREIGN KEY(id_niv) REFERENCES NivelFisico(id_niv)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Cliente VALUES
(1,8,5,3,1,NULL),
(2,3,8,2,3,NULL),
(3,7,6,1,4,NULL),
(4,5,3,2,2,NULL),
(5,9,4,2,2,NULL),
(6,10,9,1,3,NULL),
(7,5,1,2,1,NULL),
(8,8,7,3,1,NULL),
(9,7,10,2,3,NULL),
(10,9,6,2,4,NULL),
(11,8,7,2,3,NULL),
(12,2,1,2,1,NULL),
(13,1,9,2,3,NULL),
(14,2,2,2,2,NULL),
(15,10,10,3,4,NULL),
(16,5,5,3,1,NULL),
(17,7,6,2,1,NULL),
(18,4,5,3,4,NULL),
(19,10,5,3,3,NULL),
(20,9,6,2,4,NULL);

-- Hasta cliente va todo bien
-- --------------------------------------------------------

--
-- Table structure for table Bitacora
--

CREATE TABLE Bitacora ( -- Por ahora existen 20 clientes y 10 rutinas 
  id_cliente int(11) NOT NULL,
  id_rutina int(11) NOT NULL,

  -- -----------------------------------

  fecha date NOT NULL,
  nivel_satisf int(2) DEFAULT NULL, -- Del 1 al 5 por mientras
  descripcion_sesion varchar(500) NOT NULL,
  comentarios varchar(500) DEFAULT NULL,

  PRIMARY KEY(id_cliente,id_rutina,fecha),

  FOREIGN KEY(id_cliente) REFERENCES Cliente(id_cliente),
  FOREIGN KEY(id_rutina) REFERENCES Rutina(id_rutina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO Bitacora VALUES 
(1,1,'2023/02/13',5,'10 lagartijas con 5 press','Hoy me sentí súper, pude hacer todos los ejercicios de manera increíble, me sentí muy motivado.'),
(1,4, '2023/02/01',4, 'Leg press 8 x 100kg Squats 10 x  65kg 100 sentadillas', 'Me fue muy bien pero me asusto el wey que cargo 300kg de sentadilla al lado mio'),
(2, 3, '2023/02/02' , 5, 'Bench press 3x38kg, peso muerto 8x100kg' , 'Comi mucha pasta y me hizo sentir mal durante el entrenamiento' ),
(3, 8, '2023/01/14' , 2, '15 kilómetros en la maquina de correr', 'Por poco me desmayo en los últimos kilometros y vomite en el baño, todo valdrá la pena cuando baje de peso'),
(4, 1, '2023/03/22' , 5, '100 lagartijas, 100 sentadillas, 10 kilometros ', 'Me sentí muy bien, como mi personaje favorito'),
(5, 2, '2023/01/12' , 2, '2000 metros en la piscina', 'Me debe poner protector solar porque se me había quedado la espalda bien roja por nadar en el sol'),
(6, 5, '2023/01/03' , 4, '10x80kg sentadillas, 10 minutos corriendo en la caminadora.', 'Me duelen demasiado las piernas pero se sintió bien.'),
(7, 6, '2022/11/18' , 2, 'Una hora de clases de Zumba, 10 minutos en la caminadora', 'La instructora fue muy agresiva conmigo cuando yo solo quería disfrutar de mi ejercicio.'),
(8, 9, '2023/05/05' , 5, 'chest flies 10x20kg, dumbbell press 12x 22kg, shoulder raises 12x15kg', NULL),
(9, 10, '2023/08/25' , NULL, '25x200kg peso puerto', NULL),
(10, 7, '2010/08/14' , 2, '15 kilómetros en la maquina de correr', 'Por poco me desmayo en los últimos kilometros y vomite en el baño, todo valdrá la pena cuando baje de peso');

-- --------------------------------------------------------

--
-- Table structure for table DietasAlimentos
--

CREATE TABLE DietasAlimentos ( -- Actualmente hay 36 alimentos y 10 dietas
  id_dieta int(11) NOT NULL,
  id_alimento int(11) NOT NULL,

  -- -----------------------------------

  cantidad float (6,2) DEFAULT NULL,

  PRIMARY KEY(id_dieta,id_alimento),
  FOREIGN KEY(id_dieta) REFERENCES Dieta(id_dieta),
  FOREIGN KEY(id_alimento) REFERENCES Alimento(id_alimento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO DietasAlimentos VALUES
(1,3,4.1),
(1,5,3244.23),
(1,23,432.23),
(1,21,244.2),
(1,12,34.23),
(1,36,443.9),

(2,10,3),
(2,19,3.2),
(2,28,324.53),
(2,33,432.3),
(2,7,43.9),

(3,4,2.1),
(3,1,534.3),
(3,11,43.3),
(3,34,234.22),
(3,22,2323.3),

(4,2,5000.1),
(4,20,534.6),
(4,32,545.3),
(4,25,654.23),
(4,33,452.4),

(5,9,234.2),
(5,2,234),
(5,33,242.23),
(5,8,234.2),
(5,7,242.2),

(6,3,5),
(6,22,422.43),
(6,19,4332.4),
(6,23,4244),
(6,11,424.2),

(7,20,200),
(7,21,224.4),
(7,4,43.2),
(7,16,543.2),
(7,29,324),

(8,5,30),
(8,1,3),
(8,7,43.2),
(8,9,234.2),
(8,35,35.3),

(9,6,3),
(9,16,23.4),
(9,26,42.09),
(9,36,34.2),
(9,4,23.4),
(9,14,23.2),

(10,9,4),
(10,11,23.4),
(10,28,534.24),
(10,10,242.2),
(10,3,23.2);
-- Nota mental, sólo se pueden utilizar 4 dígitos para la parte de cantidades enteras

-- --------------------------------------------------------

--
-- Table structure for table DietasFavoritas
--

CREATE TABLE DietasFavoritas ( -- Existen por el momento 10 dietas y 20 clientes
  id_cliente int(11) NOT NULL,
  id_dieta int(11) NOT NULL,

  PRIMARY KEY(id_cliente,id_dieta),

  FOREIGN KEY(id_cliente) REFERENCES Cliente(id_cliente),
  FOREIGN KEY(id_dieta) REFERENCES Dieta(id_dieta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO DietasFavoritas VALUES
(1,3),
(2,10),
(3,4),
(4,2),
(5,9),
(6,3),
(7,10),
(8,5),
(9,6),
(10,9);


-- --------------------------------------------------------

--
-- Table structure for table RutinaEjercicio
--

CREATE TABLE RutinaEjercicio ( -- Existen 10 rutinas y 20 ejercicios
  id_rutina int(11) NOT NULL,
  id_ejercicio int(11) NOT NULL,
  -- -----------------------------------

  series int(3) NOT NULL,
  repeticiones int(4) NOT NULL,
  dia varchar(3) NOT NULL,

  PRIMARY KEY(id_rutina,id_ejercicio),

  FOREIGN KEY(id_rutina) REFERENCES Rutina(id_rutina),
  FOREIGN key(id_ejercicio)REFERENCES Ejercicio(id_ejercicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO RutinaEjercicio VALUES
(1,3,5,12,'LUN'),
(1,4,2,20,'LUN'),
(1,2,3,10,'LUN'),
(1,5,1,15,'LUN'),
(1,7,2,15,'LUN'),

(2,10,2,10,'JUE'),
(2,5,1,10,'JUE'),
(2,3,5,10,'JUE'),

(3,4,5,15,'VIE'),
(3,2,5,15,'VIE'),
(3,3,5,15,'VIE'),
(3,1,5,15,'VIE'),

(4,2,5,20,'SAB'),
(4,5,4,20,'SAB'),

(5,9,5,20,'MAR'),
(5,7,5,10,'MAR'),

(6,3,2,6,'MIE'),
(6,5,2,3,'MIE'),
(6,7,2,1,'MIE'),

(7,20,3,20,'SAB'),
(7,13,4,10,'SAB'),
(7,15,2,15,'SAB'),

(8,5,5,8,'VIE'),
(8,2,2,10,'VIE'),
(8,4,1,10,'VIE'),

(9,6,5,9,'LUN'),
(9,3,3,10,'LUN'),

(10,9,10,5,'MAR'),
(10,2,2,12,'MAR'),
(10,5,5,8,'MAR');


-- --------------------------------------------------------

--
-- Table structure for table RutinasFavoritas
--

CREATE TABLE RutinasFavoritas ( -- Existen por el momento 20 clientes y 10 rutinas
  id_cliente int(11) NOT NULL,
  id_rutina int(11) NOT NULL,

  PRIMARY KEY(id_cLiente,id_rutina),

  FOREIGN KEY(id_cLiente) REFERENCES Cliente(id_cliente),
  FOREIGN KEY(id_rutina) REFERENCES Rutina(id_rutina)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO RutinasFavoritas VALUES
(1,8),
(2,3),
(3,4),
(4,2),
(5,2),
(6,10),
(7,5),
(8,8),
(9,7),
(10,9),
(11,8),
(12,5),
(13,1),
(14,2),
(15,10),
(16,5),
(17,7),
(18,4),
(19,10),
(20,6);

-- --------------------------------------------------------

--
-- Table structure for table UsuarioRol
--

CREATE TABLE UsuarioRol ( -- No se pueden hacer más registros puesto que sólo hay 20 clientes y dos roles
  id_cliente int(11) NOT NULL,
  id_rol int(11) NOT NULL,

  PRIMARY KEY(id_cliente,id_rol),

  FOREIGN key(id_cliente)REFERENCES Cliente(id_cliente),
  FOREIGN key(id_rol)REFERENCES Rol(id_rol)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO UsuarioRol VALUES
(1,1),
(2,2),
(3,2),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,2),
(10,2),
(11,1),
(12,2),
(13,2),
(14,2),
(15,1),
(16,1),
(17,1),
(18,1),
(19,1),
(20,2);
-- --------------------------------------------------------

--
-- Table structure for table MedicionUsuario
--

CREATE TABLE ClienteMedicion ( -- Por el momento tenemos 20 clientes y 10 mediciones
  id_cliente int(11) NOT NULL,
  id_medicion int(11) NOT NULL,
  -- -----------------------------------

  fecha date NOT NULL,
  medida float(4,1) DEFAULT NULL,

  PRIMARY KEY(id_cliente,id_medicion,fecha),

  FOREIGN key(id_cliente)REFERENCES Cliente(id_cliente),
  FOREIGN key(id_medicion)REFERENCES Medicion(id_medicion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

INSERT INTO ClienteMedicion VALUES 
(1,5,'2023/01/23',13.3),
(2,4,'2023/01/23',23.4),
(3, 3, '2023/03/27', 25.1),
(4, 2, '2023/03/02', 24.4),
(5, 1, '2023/03/21', 15.4),
(6, 10, '2023/04/17', 27.8),
(7, 9, '2023/03/04', 12.1),
(8, 8, '2023/03/21', 14.4),
(9, 7, '2023/03/07', 25.9),
(10, 6, '2023/03/23', 22.2),
(11, 13, '2023/03/22', 27.7),
(12, 12, '2023/08/24', 21.6),
(13, 14, '2023/09/25', 35.3),
(14, 15, '2023/10/17', 45.4),
(15, 11, '2023/02/21', 13.4),
(16, 25, '2023/01/17', 111.4),
(17, 23, '2023/06/17', 313.4),
(18, 24, '2023/06/12', 23.4),
(19, 16, '2023/06/16', 1.4),
(20, 20, '2023/08/18', 34.4),
(21, 21, '2023/04/11', 12.4),
(22, 22, '2023/02/02', 25.4),
(23, 19, '2023/01/05', 45.4),
(24, 18, '2023/09/09', 55.4),
(25, 17, '2023/09/07', 67.4);
-- Por el momento, falta
-- --------------------------------------------------------