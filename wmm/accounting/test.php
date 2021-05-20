<?php

    require "utility.php";
    session_start();
        
    if(!isset($_SESSION["user_id"])){
        redirectToError("Access denied, please login.");
        die("Access denied, please login");
    }
    echo "<h2>WELCOME</h2>";
    echo "<br><a href=\"./login.php\">Login</a>";
    echo "<br><a href=\"./logout.php\">Logout</a>";
    echo "<br><a href=\"./test.php\">Test</a>";
?>