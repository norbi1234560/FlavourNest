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
        
            -- ingredients
            CONCAT(
              '[',
              GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                  'name', i.name,
                  'quantity', ri.quantity,
                  'unit', ri.unit
                )
              ),
              ']'
            ) AS ingredients,
        
            -- steps
            (
              SELECT CONCAT(
                '[',
                GROUP_CONCAT(
                  JSON_OBJECT(
                    'position', rs.position,
                    'instruction', rs.instruction
                  )
                  ORDER BY rs.position
                ),
                ']'
              )
              FROM recipe_steps rs
              WHERE rs.recipe_id = r.id
            ) AS steps,
        
            -- tags
            (
              SELECT CONCAT(
                '[',
                GROUP_CONCAT(JSON_QUOTE(t.name)),
                ']'
              )
              FROM recipe_tags rt
              JOIN tags t ON t.id = rt.tag_id
              WHERE rt.recipe_id = r.id
            ) AS tags,
        
            -- comments
            (
              SELECT CONCAT(
                '[',
                GROUP_CONCAT(
                  JSON_OBJECT(
                    'content', c.content,
                    'created_at', c.created_at
                  )
                ),
                ']'
              )
              FROM comments c
              WHERE c.recipe_id = r.id
                AND c.is_hidden = 0
            ) AS comments,
        
            -- avg rating
            (
              SELECT ROUND(AVG(score), 2)
              FROM ratings rt
              WHERE rt.recipe_id = r.id
            ) AS avg_rating
        
        FROM recipes r
        LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
        LEFT JOIN ingredients i ON i.id = ri.ingredient_id
        WHERE r.id = 1
        GROUP BY r.id;
        ";

$result = $db->execute($query);

$db = null;

Util::setResponse($result);
