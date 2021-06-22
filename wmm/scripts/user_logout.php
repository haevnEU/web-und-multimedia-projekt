<?php
    require "database_utils.php";
    session_start();

    if (!isset($_SESSION["user_id"])) {
        die;
    }
    $remote_USER_ID = $_SESSION["user_id"];

    $database_connection = get_connection_to_game_db();
    $update_query = "UPDATE player SET state = 0 WHERE USER_ID = ?";
    $statement = $database_connection->prepare($update_query);
    $statement->bind_param("i", $remote_USER_ID);
    $statement->execute();
    $database_connection->close();


    $_SESSION = [];
    session_unset();
    session_destroy();
    header("Location: /index.php");
?>