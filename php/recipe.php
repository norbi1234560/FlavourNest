<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT
            r.id,
            r.title,
            r.description,
            r.image,
            r.servings,
            r.prep_time_minutes,
            (
              SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
                  'name', i.name,
                  'quantity', ri.quantity,
                  'unit', ri.unit
              )), ']')
              FROM recipe_ingredients ri
              JOIN ingredients i ON i.id = ri.ingredient_id
              WHERE ri.recipe_id = r.id
            ) AS ingredients,
            (
              SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
                  'position', rs.position,
                  'instruction', rs.instruction
              ) ORDER BY rs.position), ']')
              FROM recipe_steps rs
              WHERE rs.recipe_id = r.id
            ) AS steps,
            (
              SELECT CONCAT('[', GROUP_CONCAT(JSON_QUOTE(t.name)), ']')
              FROM recipe_tags rt
              JOIN tags t ON t.id = rt.tag_id
              WHERE rt.recipe_id = r.id
            ) AS tags,
            (
              SELECT CONCAT('[', GROUP_CONCAT(rt.score), ']')
              FROM ratings rt
              WHERE rt.recipe_id = r.id
            ) AS ratings,
            (
              SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT(
                  'id', c.id,
                  'content', c.content,
                  'user_id', c.user_id,
                  'created_at', c.created_at,
                  'is_hidden', c.is_hidden
              ) ORDER BY c.created_at DESC), ']')
              FROM comments c
              WHERE c.recipe_id = r.id
            ) AS comments
        FROM recipes r
        WHERE r.id = :id
        GROUP BY r.id";

$result = $db->execute($query, $args["id"]);

$db = null;

Util::setResponse($result);