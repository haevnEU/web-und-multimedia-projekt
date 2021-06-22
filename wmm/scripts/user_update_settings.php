<?php


// TODO REMOVE
    require "./utility.php";
    require "database_utils.php";
    session_start();

    if (!isset($_SESSION["user_id"])) {
        header("Location: /error.php?error=" . urlencode("<p>Oooops...</p><p>Access denied to this page, please login.</p>"));
        die("Access denied, please login");
    }

    function updateTheme($theme){
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if ($_SESSION["user_id"]) {
            $uid = $_SESSION["user_id"];

            $database_connection = get_connection_to_game_db();
            $update_query = "UPDATE player SET style = \"" . $theme . "\" WHERE USER_ID = ?";
            $statement = $database_connection->prepare($update_query);
            $statement->bind_param("i", $uid);
            $statement->execute();
            $database_connection->close();

            $_SESSION["style"] = $theme;
            return true;
        }
    }


    function updatePassword($password_old, $password_new){
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if ($_SESSION["user_id"]) {
            $uid = $_SESSION["user_id"];
            $database_connection = get_connection_to_game_db();
            $select_player_query = "SELECT pass, salt, style, email, gametag USER_ID FROM player WHERE USER_ID = ?";
            $statement = $database_connection->prepare($select_player_query);
            $statement->bind_param("i", $uid);
            $statement->execute();
            $result = $statement->get_result();

            $remote_password = "";
            $remote_salt = "";
            $email = "";
            $gametag = "";
            while ($row = mysqli_fetch_array($result)) {
                $remote_password = $row['pass'];
                $remote_salt = $row['salt'];
                $email = $row['email'];
                $gametag = $row['gametag'];
            }
            if (!verifyPassword($password_old, $remote_salt, $remote_password)) {
                header("Location: /error.php?error=" . urlencode("Your old password is wrong"));
                return false;
            }

            $update_query = "UPDATE player SET pass = \"" . $password_new . "\" WHERE USER_ID = ?";
            $statement = $database_connection->prepare($update_query);
            $statement->bind_param("i", $uid);
            $statement->execute();
            $database_connection->close();
            $message = "Hello " . $gametag . ",\n\nWe inform you that someone changed your personal information. Please contact the customer support if you haven't changed your data.\n\nAffected data: password\n\n\nThis is an automated mail please do not answer";
            $subject = "Account Information";
            // send mail
            mail($email, $subject, $message);
            return true;
        }

    }


    $result = false;
    if (isset($_POST['theme'])) {
        $result = updateTheme($_POST['theme']);
    }

    if (isset($_POST['password_old']) && isset($_POST['password_new']) && isset($_POST['password_new_reentered'])) {
        if ($_POST['password_new'] != $_POST['password_new_reentered']) {
            header("Location: /error.php?error=" . urlencode("Entered password are different"));
            $result = false;
        } else {
            list ($password_new, $salt_new) = hashPassword($_POST['password_new']);
            $result = updatePassword($_POST['password_old'], $password_new);
        }
    }
    if ($result === true) {
        header("Location: /accounting/settings.php?done");
    } else {
        header("Location: /accounting/settings.php");
    }
?>