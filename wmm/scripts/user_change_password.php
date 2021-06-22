<?php
    require "utility.php";
    require "database_utils.php";
    function updatePassword($password_old, $password_new, $password_new_reentered){

        session_start();

        if (!isset($_SESSION["user_id"])) {
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }else if (!isset($password_old) || !isset($password_new) || !isset($password_new_reentered)) {
            print_error("Password error", "", "<p>One or more field are empty</p>");
            die;
        }else if ($_POST['password_new'] != $_POST['password_new_reentered']) {
            print_error("Password error", "", "<p>Entered passwords are not the same</p>");
            die;
        }
echo "HELLO";
        list ($password, $salt_new) = hashPassword($password_new);

        $uid = $_SESSION["user_id"];

        $database_connection = get_connection_to_game_db();
        $select_player_query = "SELECT pass, salt, style, email, gametag USER_ID FROM player WHERE USER_ID = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("i", $uid);
        $statement->execute();
        $result = $statement->get_result();

        $query_done = false;
        while ($row = mysqli_fetch_array($result)) {
            $remote_password = $row['pass'];
            $remote_salt = $row['salt'];
            $email = $row['email'];
            $gametag = $row['gametag'];
            $query_done = true;
        }
        if(!$query_done){
            print_error("Database error","", "<p>Cannot retrieve information about your account.</p>");
            die;
        }else if (!verifyPassword($password_old, $remote_salt, $remote_password)) {
            print_error("Password error","Cannot change the password", "<p>Entered password is wrong.</p>");
            die;
        }

        $update_query = "UPDATE player SET pass = \"" . $password . "\" WHERE USER_ID = ?";
        $statement = $database_connection->prepare($update_query);
        $statement->bind_param("i", $uid);
        $statement->execute();
        $database_connection->close();
        $message = "Hello " . $gametag . ",\n\nWe inform you that someone changed your personal information. Please contact the customer support if you haven't changed your data.\n\nAffected data: password\n\n\nThis is an automated mail please do not answer";
        $subject = "Account Information";
        // send mail
        mail($email, $subject, $message);
        header("Location: /");
    }

    updatePassword($_POST['password_old'], $_POST['password_new'], $_POST['password_new_reentered']);

?>