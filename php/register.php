<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Get arguments (data)
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database(''); 

// Set query
$query = "SELECT `id` 
            FROM `users` 
           WHERE `email` = ?;";

// Execute SQL command
$result = $db->execute($query, array($args['email']));

if (!is_null($result))
  Util::setError("A felhasználó ezen a email címen már létezik!");

// Set query
$query = $db->preparateInsert('users', $args);

// Execute SQL command
$result = $db->execute($query, array_values($args));

// Close connection
$db = null;

// Set response
Util::setResponse($result);