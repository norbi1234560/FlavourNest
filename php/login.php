<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT * FROM `users`
          WHERE `email` = :email AND
                `password` = :password";

$result = $db->execute($query, $args);

$db = null;

if (is_null($result))
    Util::setError("helytelen jelszó vagy email cím");

// Convert BLOB to base64
foreach ($result as &$row) {
    if (!empty($row['avatar'])) {
        $row['avatar'] = 'data:image/jpeg;base64,' . Util::base64Encode($row['avatar']);
    }
}

$result = $result[0];

Util::setResponse($result);
