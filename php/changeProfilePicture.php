<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$params = [
   ':id'    => $args["id"],
   ':avatar' => $args["avatar"],
];

$query = "UPDATE `users` SET `avatar`=:avatar WHERE id =:id";

$result = $db->execute($query,$params);

$db = null;

Util::setResponse($result);
