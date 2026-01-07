<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

// $params = [
//     ':email'    => $args['email'],
//     ':password' => $args['password'],
// ];

$query = "SELECT * FROM `users`
          WHERE `email` = :email AND
                `password` = :password";

$result = $db->execute($query, $args);

$db = null;

if (is_null($result))
    Uril::setError("Nincs....");

$result = $result[0];

Util::setResponse($result);
