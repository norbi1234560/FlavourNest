<?php
declare(strict_types=1);

// Include environment
require_once("../../common/php/environment.php");

// Get arguments (data)
$args = Util::getArgs();

// Connect to MySQL server
$db = new Database(''); 

$query="SELECT id FROM users WHERE email = 'repanorbi.2006@gmail.com'";

$result = $db->execute($query);

// Close connection
$db = null;

// Set response
Util::setResponse($result);