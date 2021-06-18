<?php
    session_start();
     $database_server_name = "localhost";
    $database_user_name = "register";
    $database_user_password = "1234";
    $database_table_name = "game";

    $database_connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
    $remote_USER_ID = $_SESSION["user_id"];
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