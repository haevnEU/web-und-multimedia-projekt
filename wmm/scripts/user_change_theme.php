<?php
    require "database_utils.php";

    /**
     * @brief Changes the user theme
     * @details This method writes the selected theme into the user account and sets the session attribute
     * The operation aborts if one of the following cases are fulfilled.
     *  - User is not logged in
     *  - Provided theme name is empty
     *  - Generic database error
     * @param string $theme Theme name
     */
    function updateTheme(string $theme){
        session_start();
        if (!isset($_SESSION["user_id"])) {
            // User is not logged redirect to an error page
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }else if (!isset($theme)) {
            // theme is not set redirect to an error page
            print_error("Theme error", "", "<p>Provided theme is empty</p>");
            die;
        }

        // Update the theme inside the database
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