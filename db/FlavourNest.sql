-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 07. 07:47
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

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
(4, 3, NULL, 'Tökéletes reggeli ötlet.', '2025-11-11 06:30:36', 0);

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
(8, 'Csirkemell'),
(2, 'Cukor'),
(1, 'Liszt'),
(7, 'Olívaolaj'),
(9, 'Paradicsom'),
(10, 'Sajt'),
(3, 'Só'),
(5, 'Tej'),
(4, 'Tojás'),
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
(15, 3, 7, 1, '2026-01-07 06:40:32');

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
(1, 'Palacsinta', 'Klasszikus magyar palacsinta recept.', NULL, 4, 20, '2025-11-11 06:30:36', 'BenjiNoWar.jfif'),
(2, 'Csirkés tészta', 'Krémes csirkés tészta paradicsommal és sajttal.', NULL, 2, 30, '2025-11-11 06:30:36', 'HumanNoAi.jfif'),
(3, 'Zöldséges omlett', 'Egészséges reggeli zöldségekkel.', NULL, 1, 15, '2025-11-11 06:30:36', 'SpongeNoAi.jfif');

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
(15, 3, 11, 1.000, 'ek');

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
(8, 3, 2, 'Süsd meg olívaolajon, amíg aranybarna nem lesz.');

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
(3, 6);

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
(6, 'Reggeli'),
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `avatar`) VALUES
(1, 'admin', 'admin@aa.com', 'adminadmin', '2025-11-11 05:30:36', '200w.gif'),
(3, 'chefanna', 'anna@aa.com', 'annaanna', '2025-11-11 05:30:36', NULL),
(4, 'foodiejoe', 'joe@example.com', 'joe', '2025-11-11 05:30:36', NULL),
(5, 'mariacook', 'maria@example.com', 'maria', '2025-11-11 05:30:36', NULL),
(7, 'meseljrola', 'adawdaw@aa.aa', '11111111111111', '2025-12-11 08:24:06', NULL),
(12, 'aadawdawda', 'adawdawd@aa.aa', '1111111111111111', '2025-12-11 08:29:05', NULL),
(16, 'meseljroladawdawdaw', 'adawdawdaw@aa.aa', '1111111111111', '2025-12-11 10:00:46', NULL),
(17, 'meseljroladawdawdawa', 'adawdawdaw@aa.aaa', '1111111111111', '2025-12-11 10:01:41', NULL),
(18, 'meseljrola1231', 'dawdawdaw@aa.aa', '11111111111111', '2025-12-11 10:14:18', NULL),
(19, 'meseljrola12311', 'dawdawdaw@aa.aa1', '11111111111111', '2025-12-11 10:14:27', NULL),
(20, 'mawelsjeorla', 'awdawdawda@aa.aaa', '11111111111111', '2025-12-11 10:48:55', NULL),
(23, 'melsaenawkl', 'asdasda@aa.aa', 'adminadmin', '2025-12-11 12:35:50', NULL),
(24, 'meslejkorla', 'awdawdawd@aa.aa', 'adminadmin', '2025-12-11 12:36:26', NULL),
(26, 'meseljrola123', 'dawnkldanwldnaw@aa.aa', 'adminadmin', '2025-12-16 06:49:38', NULL),
(27, 'adminadmin', 'admin@aa.com2', 'adminadmin', '2025-12-18 08:41:11', NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `recipe_steps`
--
ALTER TABLE `recipe_steps`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

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
