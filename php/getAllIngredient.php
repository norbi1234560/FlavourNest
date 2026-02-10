<?php

require_once("../../common/php/environment.php");

$db = new Database(); 

$queryIngredients = "SELECT `id`, `name` FROM `ingredients`";

$resultIngredients = $db->execute($queryIngredients);

$queryTags = "SELECT `id`, `name` FROM `tags`";

$resultTags = $db->execute($queryTags);

$db = null;

Util::setResponse(["ingredients"=>$resultIngredients,"tags"=>$resultTags]);
