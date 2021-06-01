<?php
    require "../scripts/utility.php";
    require "../scripts/links.php";
    require "../scripts/floating_menu.php";
    
    session_start();
    
    // check cookies 
    if(!isset($_SESSION["user_id"])){
        redirectToError("<p>Oooops...<p>Access denied to this page, please login.");
        die("Access denied, please login");
    }

    
    
?>