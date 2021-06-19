<?php
    require "utility.php";
    session_start();

    function checkCredentials($email, $password){
        // check cookies
        if (!isset($_SESSION["user_id"])) {
            $database_server_name = "localhost";
            $database_user_name = "register";
            $database_user_password = "1234";
            $database_table_name = "game";

            $remote_mail = "";
            $remote_pass = "";
            $remote_salt = "";
            $remote_USER_ID = "";
            // Create a database connection
            $database_connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
            if ($database_connection->connect_error) {
                redirectToError("Database connection failed. " . $database_connection->connect_error);
                return false;
            }


            $select_player_query = "SELECT email, pass, salt, style, USER_ID FROM player WHERE email = ?";
            $statement = $database_connection->prepare($select_player_query);
            $statement->bind_param("s", $email);
            $statement->execute();
            $result = $statement->get_result();

            if ($result->num_rows == 1) {
                $row = mysqli_fetch_array($result);
                $remote_mail = $row['email'];
                $remote_pass = $row['pass'];
                $remote_salt = $row['salt'];
                $remote_style = $row['style'];
                $remote_USER_ID = $row['USER_ID'];
            } else {
                redirectToError("No user found");
                $database_connection->close();
                return false;
            }


            if (!verifyPassword($password, $remote_salt, $remote_pass)) {
                redirectToError("Password is wrong<br>" . $password . "<br>" . $remote_pass);
                return false;
            }

            $_SESSION["user_id"] = $remote_USER_ID;
            $_SESSION["style"] = $remote_style;
            $update_query = "UPDATE player SET state = 1 WHERE USER_ID = ?";
            $statement = $database_connection->prepare($update_query);
            $statement->bind_param("i", $remote_USER_ID);
            $statement->execute();
            $database_connection->close();
            return true;
        }

        return true;
    }

    $mail = $_POST['email'];
    $password = $_POST['password'];
    echo "HELLO";
    if (checkCredentials($mail, $password)) {
        header('Location: /');
    } else {
        redirectToError("Cannot log in");
    }
?>