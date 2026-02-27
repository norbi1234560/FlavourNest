<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT
            id,
            title,
            description,
            image
          FROM recipes";

$result = $db->execute($query);

// Convert BLOB to base64
foreach ($result as &$row) {
    if (!empty($row['image'])) {
        $row['image'] = 'data:image/jpeg;base64,' . Util::base64Encode($row['image']);
    }
}

Util::setResponse($result);

$result = $db->execute($query);

$db = null;

Util::setResponse($result);