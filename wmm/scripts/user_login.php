<?php
    require "utility.php";
    require "database_utils.php";
    require "sercure_auth_check_code.php";

    /**
     * @brief Logs the user into his account
     * @details This method checks if the user exists and his credentials are correct if everything is valid the user
     * is logged in via setting of a session variable.
     * The operation aborts if one of the following cases are fulfilled.
     * - User is already logged in
     * - Account does not exists
     * - Account is suspended
     * - Password does not match the account password
     * - Two Factor Authentication fails
     * - Generic database error
     * @param string $email Email address of the user
     * @param string $password Password of the user
     * @param string $code Two Factor Authentication code
     * @since v1.0.0.0
     */
    function login(string $email, string $password, string $code){
        session_start();

        // If the user is already logged in redirect to home
        if (isset($_SESSION["user_id"])) {
            header("Location: /");
        }

        // Request necessary data from the database
        $database_connection = get_connection_to_game_db();
        $select_player_query = "SELECT pass, style, account_suspended, secret, USER_ID FROM player WHERE email = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $email);
        $statement->execute();
        $result = $statement->get_result();

        // If theres no data associated with provided email redirect to an error page
        if ($result->num_rows !== 1) {
            $database_connection->close();
            print_error("Login error", "", "User " . $email . " not found");
            die;
        }

        $row = mysqli_fetch_array($result);
        $remote_pass = $row['pass'];
        $secret = $row['secret'];
        $remote_style = $row['style'];
        $remote_USER_ID = $row['USER_ID'];
        $account_suspended = $row['account_suspended'];

        if($account_suspended){
            // The account is suspended redirect to an error page
            $database_connection->close();
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }else if (!verifyPassword($password, $remote_pass)) {
            // The password does not match the remote one, redirect to an error page
            $database_connection->close();
            print_error("Account error", "Password does not match", "Your entered password is wrong");
            die;
        }else if(!check_code($code, $secret)){
            // The 2FA authentication fails redirect to an error page
            $database_connection->close();
            print_error("Account error", "Entere Secure code does not match", "Your entered a wrong secure code, please use the recent generated one");
            die;
        }

        // All verification steps are successful, set session variables and update the user online state
        $_SESSION["user_id"] = $remote_USER_ID;
        $_SESSION["style"] = $remote_style;
        $update_query = "UPDATE player SET state = 1 WHERE USER_ID = ?";
        $statement = $database_connection->prepare($update_query);
        $statement->bind_param("i", $remote_USER_ID);
        $statement->execute();
        $database_connection->close();
        header("Location: /");
    }

    login($_POST['email'],$_POST['password'], $_POST['code']);
?>