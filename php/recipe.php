<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

// Get all recipes with basic info
$query = "SELECT
            r.id,
            r.title,
            r.description,
            r.image,
            r.servings,
            r.prep_time_minutes
          FROM recipes r";

$recipes = $db->execute($query);

// Prepare full recipe data
foreach ($recipes as &$recipe) {
    $recipeId = $recipe['id'];

    // Ingredients
    $ingQuery = "SELECT i.name, ri.quantity, ri.unit
                 FROM recipe_ingredients ri
                 JOIN ingredients i ON i.id = ri.ingredient_id
                 WHERE ri.recipe_id = ?";
    $recipe['ingredients'] = $db->execute($ingQuery, [$recipeId]);

    // Steps
    $stepQuery = "SELECT position, instruction
                  FROM recipe_steps
                  WHERE recipe_id = ?
                  ORDER BY position";
    $recipe['steps'] = $db->execute($stepQuery, [$recipeId]);

    // Tags
    $tagQuery = "SELECT t.name
                 FROM recipe_tags rt
                 JOIN tags t ON t.id = rt.tag_id
                 WHERE rt.recipe_id = ?";
    $tags = $db->execute($tagQuery, [$recipeId]);
    $recipe['tags'] = array_column($tags, 'name');

    // Comments
    $commentQuery = "SELECT content, created_at
                     FROM comments
                     WHERE recipe_id = ? AND is_hidden = 0";
    $recipe['comments'] = $db->execute($commentQuery, [$recipeId]);

    // Average rating
    $ratingQuery = "SELECT ROUND(AVG(score),2) AS avg_rating
                    FROM ratings
                    WHERE recipe_id = ?";
    $rating = $db->execute($ratingQuery, [$recipeId]);
    $recipe['avg_rating'] = $rating[0]['avg_rating'] ?? null;
}

$db = null;

// Send response as JSON array of recipes
Util::setResponse($recipes);
