<?php
    require "./utility.php";
        session_start();

    function updateTheme($theme){
    if(session_status() === PHP_SESSION_NONE) {
        session_start();
    }
        if($_SESSION["user_id"]){
            $database_server_name = "localhost";
            $database_user_name = "register";
            $database_user_password = "1234";
            $database_table_name = "game";

            $database_connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
            if ($database_connection->connect_error) {
                redirectToError("Database connection failed. " . $database_connection->connect_error);
                return false;
            }

            $uid = $_SESSION["user_id"];
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
    if(session_status() === PHP_SESSION_NONE) {
        session_start();
    }
        if($_SESSION["user_id"]){
            $database_server_name = "localhost";
            $database_user_name = "register";
            $database_user_password = "1234";
            $database_table_name = "game";

            $database_connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
            if ($database_connection->connect_error) {
                header("Location: /error.php?error=" . urlencode("Database connection failed. " . $database_connection->connect_error));
                return false;
            }

            $uid = $_SESSION["user_id"];

            $select_player_query = "SELECT pass, salt, style, USER_ID FROM player WHERE USER_ID = ?";

            $statement = $database_connection->prepare($select_player_query);
            $statement->bind_param("i", $uid);
            $statement->execute();
            $result = $statement->get_result();
            $remote_password = "";
            $remote_salt = "";
            while($row = mysqli_fetch_array($result)) {
                $remote_password = $row['pass'];
                $remote_salt = $row['salt'];
            }
            if(!verifyPassword($password_old, $remote_salt, $remote_password)){
                header("Location: /error.php?error=" . urlencode("Password is wrong<br>" . $password . "<br>". $remote_pass));
                return false;
            }
            $update_query = "UPDATE player SET pass = \"" . $password_new . "\" WHERE USER_ID = ?";
            $statement = $database_connection->prepare($update_query);
            $statement->bind_param("i", $uid);
            $statement->execute();
            $database_connection->close();

        return true;
        }

    }




    $result = false;
    if(isset($_POST['theme'])){
        $result = updateTheme($_POST['theme']);
    }

    if(isset($_POST['password_old']) && isset($_POST['password_new']) && isset($_POST['password_new_reentered'])){
        if($_POST['password_new'] != $_POST['password_new_reentered']){
            header("Location: /error.php?error=" . urlencode("Entered password are different"));
            $result = false;
        }else{
            list ($password_new, $salt_new) = hashPassword($_POST['password_new']);
            $result = updatePassword($_POST['password_old'], $password_new);
        }

    }
    if($result === true){
     header("Location: /accounting/settings.php?done");
    }else{
     header("Location: /accounting/settings.php");
    }

?>