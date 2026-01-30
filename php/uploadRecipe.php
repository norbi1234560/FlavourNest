<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

// ----- recipes insert -----
$queryRecipes = "INSERT INTO `recipes`(
            `title`,
            `description`,
            `author_id`,
            `servings`,
            `prep_time_minutes`)
          VALUES(
            :title,
            :description,
            :author_id,
            :servings,
            :prep_time_minutes)"; 

$resultRecipes = $db->execute($queryRecipes, $args["recipe"]);

// add recipe_id to steps
for ($i = 0; $i < count($args["steps"]); $i++) { 
    $args["steps"][$i]["recipe_id"] = $resultRecipes["firstInsertId"];;
}

Util::setResponse($args);

$db = null;
