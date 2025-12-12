<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$params = [
    ':email'    => $args['email'],
    ':password' => $args['password'],
];

$query = "SELECT * FROM `users`
          WHERE `email` = :email AND
                `password` = :password";

$result = $db->execute($query, $params);

$db = null;

Util::setResponse($result);
