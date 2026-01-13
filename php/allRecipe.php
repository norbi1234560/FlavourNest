<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT
            servings,
            id,
            title,
            description,
            image
          FROM recipes";

$result = $db->execute($query);

$db = null;

Util::setResponse($result);