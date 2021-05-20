<?php
    require "utility.php";

    session_start();
    
    // check cocky
    if(!isset($_SESSION["user_id"])){
        redirectToError("<p>Oooops...<p>Access denied to this page, please login.");
        die("Access denied, please login");
    }
?>