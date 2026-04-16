<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$args["avatar"] = Util::base64Decode($args["avatar"]);

$query = "UPDATE `users` SET `avatar`=:avatar WHERE id =:id";

$result = $db->execute($query ,$args);

if (!$result["affectedRows"]) {
   Util::setError("Nem sikerült a képfeltöltés");
}

$query= "SELECT
            `id`,
            `username`,
            `email`,
            `password`,
            `created_at`,
            `avatar`
         FROM
            `users`
         WHERE
            `id` = :id";

$result = $db->execute($query ,$args["id"]);

$result[0]["avatar"] = Util::base64Encode($result[0]["avatar"]);

Util::setResponse($result);
