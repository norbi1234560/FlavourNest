<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "INSERT INTO `ratings`(
              `recipe_id`,
              `user_id`,
              `score`)
          VALUES(
              :recipe_id,
              :user_id,
              :score)
              ON DUPLICATE KEY UPDATE score = VALUES(score)";

$result = $db->execute($query,$args);

$db = null;

Util::setResponse($result);
