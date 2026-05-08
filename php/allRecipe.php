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
            COALESCE(
              (
                SELECT ROUND(AVG(rt.score), 1)
                FROM ratings rt
                WHERE rt.recipe_id = r.id
              ), 0
            ) AS average_rating
          FROM recipes r";

$result = $db->execute($query);

// Convert BLOB to base64
foreach ($result as &$row) {
    if (!empty($row['image'])) {
        $row['image'] = 'data:image/jpeg;base64,' . Util::base64Encode($row['image']);
    }
}

$db = null;

Util::setResponse($result);