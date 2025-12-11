<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$params = [
   ':id'    => $args["id"],
   ':password' => $args["password"],
];

$query = "UPDATE `users` SET `password`=:password WHERE id =:id";

$result = $db->execute($query,$params);

$db = null;

Util::setResponse($result);
