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
    Util::setResponse(false);
}

$params2 = [
    ':username' => $args['username'],
    ':email'    => $args['email'],
    ':password'    => $args['password'],
];

$query = "INSERT INTO `users` (`username`, `email`, `password`)
                VALUES (:username, :email, :password)";

$result = $db->execute($query, $params2);

$params3 = [
    ':id' => $result["firstInsertId"]
];

$result2= $db->execute("SELECT * FROM `users` WHERE `id`=:id",$params3);

$db = null;

Util::setResponse($result2);