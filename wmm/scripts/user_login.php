<?php
    require "utility.php";
    require "database_utils.php";
    session_start();

    function checkCredentials($email, $password){
        if (!isset($_SESSION["user_id"])) {
            $remote_mail = "";
            $remote_pass = "";
            $remote_salt = "";
            $remote_USER_ID = "";

            $database_connection = get_connection_to_game_db();
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
                $database_connection->close();
                header("Location: /error.php?error=" . urlencode("User " . $email . " not found"));
                die;
            }

            if (!verifyPassword($password, $remote_salt, $remote_pass)) {
                $database_connection->close();
                header("Location: /error.php?error=" . urlencode("Password does not match"));
                die;
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
    if (checkCredentials($mail, $password)) {
        header('Location: /');
    } else {
        header("Location: /error.php?error=" . urlencode("Cannot log in"));
    }
?>