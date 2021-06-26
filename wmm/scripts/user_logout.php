<?php
    require "database_utils.php";

    /**
     * @brief Logs the user out of his account
     * @details This method unsets and destroys the session it will also update the online state of the user.
     * The operation aborts if one of the following cases are fulfilled.
     * - The user is not logged in
     * @since v1.0.0.0
     */
    function logout(){
        session_start();
        // Abort if the user is not logged in
        if (!isset($_SESSION["user_id"])) {
            die;
        }

        // Update the online state of the user
        $remote_USER_ID = $_SESSION["user_id"];
        $database_connection = get_connection_to_game_db();
        $update_query = "UPDATE player SET state = 0 WHERE USER_ID = ?";
        $statement = $database_connection->prepare($update_query);
        $statement->bind_param("i", $remote_USER_ID);
        $statement->execute();
        $database_connection->close();

        // clean up the session and redirect to the root page
        $_SESSION = [];
        session_unset();
        session_destroy();
        header("Location: /");
    }

    logout();
?>