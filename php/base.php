<?php

require_once("../../common/php/environment.php");

$db = new Database(); 

$query = "SELECT `image` FROM `recipes`";
$result = $db->execute($query);

foreach ($result as &$row) {
    // Convert blob to base64 string
    $row['image'] = base64_encode($row['image']);
}

$db = null;

Util::setResponse($result);
