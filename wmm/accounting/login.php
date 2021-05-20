<?php
    require "utility.php";
    session_start();
    
// check cookies
    if(!isset($_SESSION["user_id"])){
        $_SESSION["user_id"] = 1;
    }
    
    header("Location: ./test.php");

?>