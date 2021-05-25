<?php
    require "../scripts/links.php";

    session_start();
    
    function updateScore($score){
        //save to db
    }

    $score = $_POST["score"];
    $userID = $_SESSION["user_id"];
    if(isset($score) && isset($userID)){
        updateScore($score);
    }

    header("Location: $page_game");
?>