<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$queryProfile = "SELECT  `id`,
                  `username`,
                  `created_at`,
                  `avatar`
          FROM
              `users`
          WHERE `username`= :username";

$resultProfile = $db->execute($queryProfile,$args);

if (is_null($resultProfile)) {
  Util::setResponse(null);
}

$queryRecipes="SELECT r.id,
                      r.title,
                      r.description,
                      r.image,
                      u.username
               FROM recipes r
               JOIN users u ON r.author_id = u.id
               WHERE u.username = :username";


$resultRecipes = $db->execute($queryRecipes,$args);

// Convert BLOB to base64
foreach ($resultRecipes as &$row) {
    if (!empty($row['image'])) {
        $row['image'] = 'data:image/jpeg;base64,' . Util::base64Encode($row['image']);
    }
}

$db = null;

Util::setResponse(["profile"=>$resultProfile,"recipes"=>$resultRecipes]);
