<?php

require_once("../../common/php/environment.php");

$args = Util::getArgs();

$db = new Database(); 

$query = "SELECT score
          FROM ratings
          WHERE user_id = :user_id AND 
                recipe_id = :recipe_id";

$result = $db->execute($query,$args);

$db = null;




if (is_null($result)) {
      Util::setError("még nem értékelted te vén fasz");
}

Util::setResponse($result[0]["score"]);
