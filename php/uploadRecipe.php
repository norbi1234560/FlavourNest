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

$db = null;

Util::setResponse([$args,$resultRecipes]);

// $querySteps= $db->preparateInsert("recipe_steps",array_keys($args["steps"][0]),count($args["steps"]));

// $resultSteps= $db->execute($querySteps,$args("steps"));

// Util::setResponse($resultSteps);


