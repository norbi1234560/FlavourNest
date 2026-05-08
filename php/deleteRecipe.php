<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

// TÖRLÉS
$query = "DELETE
          FROM
              `recipes`
          WHERE
              `id`=?";

$result = $db->execute($query, $args["id"]);

if ($result["affectedRows"] != 1) {
    Util::setError("A recept törlése nem sikerült!");
}

$query = "SELECT  r.id,
                  r.title,
                  r.description,
                  r.image,
                  u.username
          FROM recipes r
          JOIN users u ON r.author_id = u.id
          WHERE u.username = ?";

$result = $db->execute($query, $args["username"]);

if ($result === null) {
    $result = [];
}

if (!empty($result) && is_array($result)) {
    foreach ($result as &$row) {
        if (!empty($row['image'])) {
            $row['image'] = 'data:image/jpeg;base64,' . Util::base64Encode($row['image']);
        }
    }
}

$db = null;

Util::setResponse($result);