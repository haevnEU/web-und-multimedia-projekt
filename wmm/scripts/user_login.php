<?php
    require "utility.php";
    require "database_utils.php";

    /**
     * Logs the user into his account to enabled extended features.
     *
     *  The operation aborts if one of the following events occur
     * - User is already logged in
     * - Account does not exists
     * - Account is suspended
     * - Password does not match the account password
     * - Generic database error
     * @param string $email Email address of the user
     * @param string $password Password of the user
     */
    function login(string $email, string $password){
        session_start();
        if (isset($_SESSION["user_id"])) {
            header("Location: /");
        }
        $database_connection = get_connection_to_game_db();
        $select_player_query = "SELECT pass, style, account_suspended, USER_ID FROM player WHERE email = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $email);
        $statement->execute();
        $result = $statement->get_result();

        if ($result->num_rows !== 1) {
            $database_connection->close();
            print_error("Login error", "", "User " . $email . " not found");
            die;
        }
        $row = mysqli_fetch_array($result);
        $remote_pass = $row['pass'];
        $remote_style = $row['style'];
        $remote_USER_ID = $row['USER_ID'];
        $account_suspended = $row['account_suspended'];

        if($account_suspended){
            $database_connection->close();
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }else if (!verifyPassword($password, $remote_pass)) {
            $database_connection->close();
            print_error("Account error", "Password does not match", "Your entered password is wrong");
            die;
        }

        $_SESSION["user_id"] = $remote_USER_ID;
        $_SESSION["style"] = $remote_style;
        $update_query = "UPDATE player SET state = 1 WHERE USER_ID = ?";
        $statement = $database_connection->prepare($update_query);
        $statement->bind_param("i", $remote_USER_ID);
        $statement->execute();
        $database_connection->close();
        header("Location: /");
    }

    login($_POST['email'],$_POST['password']);
?>