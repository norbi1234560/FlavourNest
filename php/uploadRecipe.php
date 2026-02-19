<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

Util::setResponse($args);

$db = new Database(); 

$args['recipe']['image']= Util::base64Decode($args['recipe']['image']);

// recipes insert
$queryRecipes = "INSERT INTO `recipes`(
            `title`,
            `description`,
            `author_id`,
            `servings`,
            `prep_time_minutes`,
            `image`)
          VALUES(
            :title,
            :description,
            :author_id,
            :servings,
            :prep_time_minutes,
            :image)"; 

$resultRecipes = $db->execute($queryRecipes, $args["recipe"]);

//add recipe_id to steps
for ($i = 0; $i < count($args["steps"]); $i++) { 
  $args["steps"][$i]["recipe_id"] = $resultRecipes["lastInsertId"];
}

//add recipe_id to ingredients
for ($i = 0; $i < count($args["ingredients"]); $i++) { 
  $args["ingredients"][$i]["recipe_id"] = $resultRecipes["lastInsertId"];
}

//steps part
$querySteps= $db->preparateInsert("recipe_steps", array_keys($args["steps"][0]), count($args["steps"]));

$paramsSteps = Util::arrayOfAssocArrayToArray($args["steps"]);

$resultSteps= $db->execute($querySteps, $paramsSteps);

//Ingredients part
$queryIngredients= $db->preparateInsert("recipe_ingredients", array_keys($args["ingredients"][0]), count($args["ingredients"]));

$paramsIngredients= Util::arrayOfAssocArrayToArray($args["ingredients"]);

$resultIngredients=$db->execute($queryIngredients,$paramsIngredients);

$db = null;

Util::setResponse([$resultRecipes, $resultSteps,$resultIngredients]);


