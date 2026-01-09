<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

// Simple query: only title, description, image
$query = "SELECT
            id,
            title,
            description,
            image
          FROM recipes";

$result = $db->execute($query);

$db = null;

// Send response as JSON
Util::setResponse($result);