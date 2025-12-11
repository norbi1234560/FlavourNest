<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "DELETE FROM `users` WHERE `id`=:id";

$result = $db->execute($query,$args['id']);

$db = null;

Util::setResponse($result);
