-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 14. 13:30
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
DROP DATABASE IF EXISTS flavournest;
CREATE DATABASE flavournest
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE flavournest;
--
-- Adatbázis: `flavournest`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `recipe_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_hidden` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `comments`
--

INSERT INTO `comments` (`id`, `recipe_id`, `user_id`, `content`, `created_at`, `is_hidden`) VALUES
(1, 1, NULL, 'Nagyon finom lett, köszönöm a receptet!', '2025-11-11 06:30:36', 0),
(2, 1, NULL, 'Klasszikus ízvilág, imádom.', '2025-11-11 06:30:36', 0),
(3, 2, NULL, 'Gyors és ízletes, új kedvenc!', '2025-11-11 06:30:36', 0),
(4, 3, NULL, 'Tökéletes reggeli ötlet.', '2025-11-11 06:30:36', 0),
(5, 4, 4, 'A téli időszakban tökéletes melegítő leves!', '2026-01-07 07:00:00', 0),
(6, 5, 5, 'Könnyű és frissítő, nyári kedvenc.', '2026-01-07 07:05:00', 0),
(7, 6, 3, 'Laktató és krémes, a család minden tagja szereti.', '2026-01-07 07:10:00', 0),
(8, 7, 1, 'Fantasztikus desszert különleges alkalmakra.', '2026-01-07 07:15:00', 0),
(9, 8, 7, 'Gyors és egészséges vacsora ötlet.', '2026-01-07 07:20:00', 0),
(10, 2, 4, 'Szerettem volna több fűszert hozzáadni.', '2026-01-07 07:25:00', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingredients`
--

CREATE TABLE `ingredients` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`) VALUES
(11, 'Bazsalikom'),
(12, 'Bors'),
(31, 'Brokkoli'),
(13, 'Burgonya'),
(29, 'Citrom'),
(16, 'Csirkealap'),
(8, 'Csirkemell'),
(25, 'Csokoládé'),
(2, 'Cukor'),
(21, 'Darálthús'),
(19, 'Fokhagyma'),
(24, 'Hagyma'),
(18, 'Joghurt'),
(30, 'Kapor'),
(20, 'Kapribogyó'),
(28, 'Lazac'),
(1, 'Liszt'),
(7, 'Olívaolaj'),
(23, 'Paprika'),
(9, 'Paradicsom'),
(15, 'Petrezselyem'),
(27, 'Porcukor'),
(14, 'Répa'),
(22, 'Rizs'),
(10, 'Sajt'),
(3, 'Só'),
(5, 'Tej'),
(26, 'Tejszín'),
(32, 'Tészta'),
(4, 'Tojás'),
(17, 'Uborka'),
(6, 'Vaj');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) NOT NULL,
  `recipe_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `score` tinyint(4) NOT NULL CHECK (`score` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ratings`
--

INSERT INTO `ratings` (`id`, `recipe_id`, `user_id`, `score`, `created_at`) VALUES
(1, 1, 1, 5, '2026-01-07 06:40:32'),
(2, 1, 3, 4, '2026-01-07 06:40:32'),
(3, 1, 4, 3, '2026-01-07 06:40:32'),
(4, 1, 5, 2, '2026-01-07 06:40:32'),
(5, 1, 7, 1, '2026-01-07 06:40:32'),
(6, 2, 1, 4, '2026-01-07 06:40:32'),
(7, 2, 3, 5, '2026-01-07 06:40:32'),
(8, 2, 4, 4, '2026-01-07 06:40:32'),
(9, 2, 5, 3, '2026-01-07 06:40:32'),
(10, 2, 7, 2, '2026-01-07 06:40:32'),
(11, 3, 1, 3, '2026-01-07 06:40:32'),
(12, 3, 3, 4, '2026-01-07 06:40:32'),
(13, 3, 4, 5, '2026-01-07 06:40:32'),
(14, 3, 5, 2, '2026-01-07 06:40:32'),
(15, 3, 7, 1, '2026-01-07 06:40:32'),
(16, 4, 1, 5, '2026-01-07 07:00:00'),
(17, 4, 3, 4, '2026-01-07 07:00:00'),
(18, 4, 5, 5, '2026-01-07 07:00:00'),
(19, 5, 4, 4, '2026-01-07 07:00:00'),
(20, 5, 7, 3, '2026-01-07 07:00:00'),
(21, 6, 1, 5, '2026-01-07 07:00:00'),
(22, 6, 3, 5, '2026-01-07 07:00:00'),
(23, 7, 4, 4, '2026-01-07 07:00:00'),
(24, 8, 5, 5, '2026-01-07 07:00:00');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipes`
--

CREATE TABLE `recipes` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `servings` int(11) DEFAULT NULL,
  `prep_time_minutes` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipes`
--

INSERT INTO `recipes` (`id`, `title`, `description`, `author_id`, `servings`, `prep_time_minutes`, `created_at`, `image`) VALUES
(1, 'Palacsinta', 'Klasszikus magyar palacsinta recept.', NULL, 4, 20, '2025-11-11 06:30:36', '200w.gif'),
(2, 'Csirkés tészta', 'Krémes csirkés tészta paradicsommal és sajttal.', NULL, 2, 30, '2025-11-11 06:30:36', 'csirkes_teszta.jpeg'),
(3, 'Zöldséges omlett', 'Egészséges reggeli zöldségekkel.', NULL, 1, 15, '2025-11-11 06:30:36', 'zoldseges_omlett.jpg'),
(4, 'Húsleves', 'Hagyományos magyar húsleves zöldségekkel.', 3, 6, 120, '2026-01-07 07:00:00', 'husleves.webp'),
(5, 'Uborkasaláta', 'Friss, fokhagymás uborkasaláta joghurttal.', 4, 4, 15, '2026-01-07 07:00:00', 'uborkasalata.webp'),
(6, 'Pörkölt', 'Hagyományos magyar pörkölt galuskával.', 5, 4, 90, '2026-01-07 07:00:00', 'porkolt.jpeg'),
(7, 'Csokoládétorta', 'Gazdag csokoládétorta tejszínhabbal.', 1, 8, 180, '2026-01-07 07:00:00', 'csokitorta.webp'),
(8, 'Grillezett lazac', 'Grillezett lazac citromos kapor mártással.', 7, 2, 25, '2026-01-07 07:00:00', 'lazac.jpg'),
(9, 'Brokkoli krémleves', 'Krémes brokkolileves sajttal.', 3, 4, 35, '2026-01-07 07:30:00', 'brokkoli_kremleves.webp'),
(10, 'Carbonara', 'Klasszikus olasz carbonara tészta.', 4, 2, 20, '2026-01-07 07:30:00', 'carbonara.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `id` bigint(20) NOT NULL,
  `recipe_id` bigint(20) NOT NULL,
  `ingredient_id` bigint(20) NOT NULL,
  `quantity` decimal(9,3) DEFAULT NULL,
  `unit` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`id`, `recipe_id`, `ingredient_id`, `quantity`, `unit`) VALUES
(1, 1, 1, 200.000, 'g'),
(2, 1, 2, 30.000, 'g'),
(3, 1, 3, 2.000, 'g'),
(4, 1, 4, 2.000, 'db'),
(5, 1, 5, 300.000, 'ml'),
(6, 1, 6, 20.000, 'g'),
(7, 2, 8, 250.000, 'g'),
(8, 2, 9, 2.000, 'db'),
(9, 2, 10, 100.000, 'g'),
(10, 2, 7, 1.000, 'ek'),
(11, 2, 3, 1.000, 'csipet'),
(12, 3, 4, 2.000, 'db'),
(13, 3, 7, 1.000, 'ek'),
(14, 3, 3, 1.000, 'csipet'),
(15, 3, 11, 1.000, 'ek'),
(16, 4, 8, 500.000, 'g'),
(17, 4, 13, 300.000, 'g'),
(18, 4, 14, 200.000, 'g'),
(19, 4, 24, 1.000, 'db'),
(20, 4, 3, 10.000, 'g'),
(21, 4, 12, 5.000, 'g'),
(22, 4, 15, 1.000, 'köteg'),
(23, 4, 16, 2.000, 'l'),
(24, 5, 17, 400.000, 'g'),
(25, 5, 18, 200.000, 'ml'),
(26, 5, 19, 2.000, 'gerezd'),
(27, 5, 3, 5.000, 'g'),
(28, 5, 20, 50.000, 'g'),
(29, 6, 21, 600.000, 'g'),
(30, 6, 24, 2.000, 'db'),
(31, 6, 23, 2.000, 'db'),
(32, 6, 7, 2.000, 'ek'),
(33, 6, 3, 10.000, 'g'),
(34, 6, 12, 5.000, 'g'),
(35, 6, 22, 200.000, 'g'),
(36, 7, 25, 200.000, 'g'),
(37, 7, 26, 200.000, 'ml'),
(38, 7, 4, 3.000, 'db'),
(39, 7, 1, 150.000, 'g'),
(40, 7, 27, 100.000, 'g'),
(41, 7, 6, 100.000, 'g'),
(42, 8, 28, 400.000, 'g'),
(43, 8, 29, 1.000, 'db'),
(44, 8, 30, 10.000, 'g'),
(45, 8, 7, 2.000, 'ek'),
(46, 8, 3, 5.000, 'g'),
(47, 9, 31, 500.000, 'g'),
(48, 9, 24, 1.000, 'db'),
(49, 9, 16, 1.000, 'l'),
(50, 9, 10, 100.000, 'g'),
(51, 9, 5, 200.000, 'ml'),
(52, 10, 32, 250.000, 'g'),
(53, 10, 4, 2.000, 'db'),
(54, 10, 10, 100.000, 'g'),
(55, 10, 21, 150.000, 'g'),
(56, 10, 12, 2.000, 'g');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe_steps`
--

CREATE TABLE `recipe_steps` (
  `id` bigint(20) NOT NULL,
  `recipe_id` bigint(20) NOT NULL,
  `position` int(11) NOT NULL,
  `instruction` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipe_steps`
--

INSERT INTO `recipe_steps` (`id`, `recipe_id`, `position`, `instruction`) VALUES
(1, 1, 1, 'A lisztet, cukrot és sót keverd össze.'),
(2, 1, 2, 'Add hozzá a tojásokat és fokozatosan a tejet.'),
(3, 1, 3, 'Süssd ki kevés vajon mindkét oldalát.'),
(4, 2, 1, 'Pirítsd meg az apróra vágott csirkét olívaolajon.'),
(5, 2, 2, 'Add hozzá a paradicsomot és a sajtot.'),
(6, 2, 3, 'Főzd össze, majd tálald melegen.'),
(7, 3, 1, 'A tojásokat verd fel sóval és bazsalikommal.'),
(8, 3, 2, 'Süsd meg olívaolajon, amíg aranybarna nem lesz.'),
(9, 4, 1, 'A csirkét és a zöldségeket tedd egy nagy fazékba.'),
(10, 4, 2, 'Öntsd fel vízzel, add hozzá a fűszereket.'),
(11, 4, 3, 'Főzd lassú tűzön 2 órán át.'),
(12, 4, 4, 'Szűrd le és tálald forrón.'),
(13, 5, 1, 'Az uborkát vágd vékony szeletekre.'),
(14, 5, 2, 'Keverd össze a joghurttal, fokhagymával és sóval.'),
(15, 5, 3, 'Hűtsd le 30 percig, majd add hozzá a kaprit.'),
(16, 6, 1, 'A hagymát pirítsd meg az olajon.'),
(17, 6, 2, 'Add hozzá a darált húst és pirítsd meg.'),
(18, 6, 3, 'Tedd hozzá a paprikát és a fűszereket.'),
(19, 6, 4, 'Öntsd fel vízzel és főzd puhára.'),
(20, 7, 1, 'Olvaszd meg a csokoládét vajjal.'),
(21, 7, 2, 'Keverd össze a tojásokkal, liszttel és cukorral.'),
(22, 7, 3, 'Süsd 180°C-on 40 percig.'),
(23, 7, 4, 'Díszítsd tejszínhabbal.'),
(24, 8, 1, 'A lazacot sózd, borsozd meg.'),
(25, 8, 2, 'Grillázd 4-5 perc mindkét oldalán.'),
(26, 8, 3, 'Készítsd el a citromos kapor mártást.'),
(27, 9, 1, 'A brokkolit és hagymát párold meg.'),
(28, 9, 2, 'Add hozzá a csirkealaplevet és főzd puhára.'),
(29, 9, 3, 'Turmixold simára, add hozzá a tejet és sajtot.'),
(30, 10, 1, 'Főzd meg a tésztát sós vízben.'),
(31, 10, 2, 'Süsd meg a darált húst.'),
(32, 10, 3, 'Keverd össze a tojással és sajttal.'),
(33, 10, 4, 'Forgasd össze a tésztával és tálald azonnal.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `recipe_tags`
--

CREATE TABLE `recipe_tags` (
  `recipe_id` bigint(20) NOT NULL,
  `tag_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `recipe_tags`
--

INSERT INTO `recipe_tags` (`recipe_id`, `tag_id`) VALUES
(1, 1),
(1, 6),
(2, 2),
(2, 5),
(3, 4),
(3, 6),
(4, 2),
(4, 5),
(5, 4),
(5, 5),
(6, 2),
(7, 1),
(8, 2),
(8, 5),
(9, 4),
(9, 5),
(10, 2),
(10, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tags`
--

INSERT INTO `tags` (`id`, `name`) VALUES
(1, 'Desszert'),
(5, 'Egészséges'),
(2, 'Főétel'),
(3, 'Gyors'),
(7, 'Leves'),
(9, 'Magyar'),
(10, 'Olasz'),
(6, 'Reggeli'),
(8, 'Saláta'),
(4, 'Vegetáriánus');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` date NOT NULL,
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `avatar`) VALUES
(1, 'admin', 'admin@aa.com', 'adminadmin', '2025-11-11', '200w.gif'),
(3, 'chefanna', 'anna@aa.com', 'annaanna', '2025-11-11', NULL),
(4, 'foodiejoe', 'joe@example.com', 'joe', '2025-11-11', NULL),
(5, 'mariacook', 'maria@example.com', 'maria', '2025-11-11', NULL),
(7, 'meseljrola', 'adawdaw@aa.aa', '11111111111111', '2025-12-11', NULL),
(12, 'aadawdawda', 'adawdawd@aa.aa', '1111111111111111', '2025-12-11', NULL),
(16, 'meseljroladawdawdaw', 'adawdawdaw@aa.aa', '1111111111111', '2025-12-11', NULL),
(17, 'meseljroladawdawdawa', 'adawdawdaw@aa.aaa', '1111111111111', '2025-12-11', NULL),
(18, 'meseljrola1231', 'dawdawdaw@aa.aa', '11111111111111', '2025-12-11', NULL),
(19, 'meseljrola12311', 'dawdawdaw@aa.aa1', '11111111111111', '2025-12-11', NULL),
(20, 'mawelsjeorla', 'awdawdawda@aa.aaa', '11111111111111', '2025-12-11', NULL),
(23, 'melsaenawkl', 'asdasda@aa.aa', 'adminadmin', '2025-12-11', NULL),
(24, 'meslejkorla', 'awdawdawd@aa.aa', 'adminadmin', '2025-12-11', NULL),
(26, 'meseljrola123', 'dawnkldanwldnaw@aa.aa', 'adminadmin', '2025-12-16', NULL),
(27, 'adminadmin', 'admin@aa.com2', 'adminadmin', '2025-12-18', NULL),
(28, 'awkhbdakwsd', 'awdiuabwd@aa.com', 'adminadmin', '0000-00-00', NULL),
(29, 'aldjnawndl', 'akljbdniaowda@aa.com', 'adminadmin', '0000-00-00', NULL),
(32, 'aklwdnaowndaow', 'aiwubdaiwonda@aa.com', 'adminadmin', '0000-00-00', NULL),
(33, 'awkdbawkd', 'aljdnawod@aa.com', 'adminadmin', '0000-00-00', NULL),
(35, 'adonbwakldbjnaw', 'awdlawbnoda@aa.com', 'adminadmin', '0000-00-00', NULL),
(36, 'awkjdnawod', 'awldinawoidna@aa.com', 'adminadmin', '2026-01-14', NULL),
(38, 'awkjdbawkbdaw', 'awljdjbnawkdbnawakwdna@aa.com', 'adminadmin', '0000-00-00', NULL),
(39, 'awljdbawkbda', 'ajdjw@aa.com', 'adminadmin', '2026-01-14', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_comment_recipe` (`recipe_id`),
  ADD KEY `idx_comment_user` (`user_id`);

--
-- A tábla indexei `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`,`user_id`),
  ADD KEY `idx_rating_recipe` (`recipe_id`),
  ADD KEY `idx_rating_user` (`user_id`);

--
-- A tábla indexei `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_recipe_author` (`author_id`);

--
-- A tábla indexei `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`),
  ADD KEY `idx_recipe_ingredient_recipe` (`recipe_id`);

--
-- A tábla indexei `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`,`position`),
  ADD KEY `idx_step_recipe` (`recipe_id`);

--
-- A tábla indexei `recipe_tags`
--
ALTER TABLE `recipe_tags`
  ADD PRIMARY KEY (`recipe_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `idx_recipe_tag_recipe` (`recipe_id`);

--
-- A tábla indexei `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT a táblához `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT a táblához `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT a táblához `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Megkötések a táblához `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recipe_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

--
-- Megkötések a táblához `recipe_steps`
--
ALTER TABLE `recipe_steps`
  ADD CONSTRAINT `recipe_steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `recipe_tags`
--
ALTER TABLE `recipe_tags`
  ADD CONSTRAINT `recipe_tags_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `recipe_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
