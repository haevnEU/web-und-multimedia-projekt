<?php
    /**
     * @brief Creates a mysqli object
     * @details The created object is used as a connection object to a mysql database. The database is located at the
     * local machine therefore the servername is localhost. The used database is game. The default user ist register
     * with 1234 as password but these can be changed.
     * @param string $user database user
     * @param string $password user password
     * @return mysqli connection object
     */
function get_connection_to_game_db(string $user = "register", string $password = "1234") : mysqli{
    $database_server_name = "localhost";
    $database_user_name = $user;
    $database_user_password = $password;
    $database_table_name = "game";

    return new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
}

    /**
     * @brief Handles a database error
     * @details This method is called if a database error occurs. If the method is called the connection to the database
     * will be terminated and the user is redirected to an error page where the error is shown.
     * @param $database_connection MYSQLI Connection to close
     */
    function internal_database_error($database_connection){
        $database_error = $database_connection->error;
        $database_connection->close();
        header("Location: /error.php?error=" . urlencode("<div><h1>Internal Database Server</h1><br><p>". $database_error . "</p><br><p>" . "</div>"));
    }
?>