<?php
    require "database_utils.php";

    /**
     * This method writes the theme into the database
     *  The operation aborts if one of the following events occur
     *  - User is not logged in
     *  - Provided theme name is empty
     *  - Generic database error
     * @param string $theme Name of the theme
     */
    function updateTheme(string $theme){
        session_start();
        if (!isset($_SESSION["user_id"])) {
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }else if (!isset($theme)) {
            print_error("Theme error", "", "<p>Provided theme is empty</p>");
            die;
        }
        $uid = $_SESSION["user_id"];

        $database_connection = get_connection_to_game_db();
        $update_query = "UPDATE player SET style = ? WHERE USER_ID = ?";

        $statement = $database_connection->prepare($update_query);
        $statement->bind_param("si", $theme, $uid);
        $statement->execute();
        $database_connection->close();

        $_SESSION["style"] = $theme;
        header("location: /accounting/settings.php");
    }

    updateTheme($_POST['theme']);
?>