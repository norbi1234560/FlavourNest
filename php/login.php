<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT * FROM `users`
          WHERE `email` = :email AND
                `password` = :password";

$result = $db->execute($query, $args);

$result[0]["avatar"] = Util::base64Encode($result[0]["avatar"]);

$db = null;

if (is_null($result))
    Util::setError("helytelen jelszó vagy email cím");

$result = $result[0];

Util::setResponse($result);
