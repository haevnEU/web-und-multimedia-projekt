<?php
    require "utility.php";
    require "links.php";
    
    session_start();
    
    // check cookies 
    if(!isset($_SESSION["user_id"])){
        redirectToError("<p>Oooops...<p>Access denied to this page, please login.");
        die("Access denied, please login");
    }

    
    
?>