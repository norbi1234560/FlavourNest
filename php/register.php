<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database();

$params = [
    ':username' => $args['username'],
    ':email'    => $args['email'],
];

$queryCheck = "SELECT * FROM `users` 
               WHERE `username` = :username OR `email` = :email";

$existingUser = $db->execute($queryCheck, $params);

if (!is_null($existingUser)) {
    Util::setError("Már létezik ilyen nevű vagy email című felhasználó");
}

$query = "INSERT INTO `users` (`username`, `email`, `password`,`created_at`)
                VALUES (:username, :email, :password, :created_at)";

$result = $db->execute($query,$args);

$db = null;

Util::setResponse($result);