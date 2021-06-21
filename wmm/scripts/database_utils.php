<?php
    function get_connection_to_game_db(){
        $database_server_name = "localhost";
        $database_user_name = "register";
        $database_user_password = "1234";
        $database_table_name = "game";

        return new mysqli('localhost', 'register', '1234', 'game');
    }

    function internal_database_error($database_connection){
        $database_error = "";
        $database_connection->close();
        header("Location: /error.php?error=" . urlencode("<div><h1>Internal Database Server</h1><br><p>". $database_error . "</p><br><p>" . "</div>"));
    }
?>