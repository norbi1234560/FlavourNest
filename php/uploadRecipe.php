<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "INSERT INTO `recipes`(
            `title`,
            `description`,
            `author_id`,
            `servings`,
            `prep_time_minutes`
        VALUES(
            '[value-1]',
            '[value-2]',
            '[value-3]',
            '[value-4]',
            '[value-5]',
            '[value-6]',
            '[value-7]',
            '[value-8]'
        )";

$result = $db->execute($query);

$db = null;

Util::setResponse($args["recipe"]);
    