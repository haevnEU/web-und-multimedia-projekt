<?php
    /**
     * Creates a new MYSQLI object
     * @return mysqli
     */
function get_connection_to_game_db(string $user = "register", string $password = "1234") : mysqli{
    $database_server_name = "localhost";
    $database_user_name = $user;
    $database_user_password = $password;
    $database_table_name = "game";

    return new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
}


    function get_create_connection_to_game_db() : mysqli{
        return get_connection_to_game_db("create", "1234");
    }

    function get_update_connection_to_game_db() : mysqli{
        return get_connection_to_game_db("update", "1234");
    }


    /**
     * Closes the database connection and redirects to an error page
     * @param $database_connection MYSQLI Connection to close
     */
    function internal_database_error($database_connection){
        $database_error = $database_connection->error;
        $database_connection->close();
        header("Location: /error.php?error=" . urlencode("<div><h1>Internal Database Server</h1><br><p>". $database_error . "</p><br><p>" . "</div>"));
    }
?>