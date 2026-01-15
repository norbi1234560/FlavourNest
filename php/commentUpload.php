<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "INSERT INTO `comments`(
          `recipe_id`,
          `user_id`,
          `content`
        )
        VALUES(
          :recipe_id,
          :user_id,
          :content
        );";

$result = $db->execute($query,$args);

$db = null;

Util::setResponse($result);
