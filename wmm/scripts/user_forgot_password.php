<?php
require "utility.php";
require "database_utils.php";
require "sercure_auth_check_code.php";

/**
 * Updates the user password
 *
 *  The operation aborts if one of the following events occur
 * - User is not logged in
 * - The old password does not match the current password
 * - Empty fields are provided
 * - New password does not match the verfiy password
 * - Generic database error
 * @param string $code Secure code from 2FA
 * @param string $password_new Desired new password
 * @param string $password_new_reentered Desired new password to verify
 */
function updatePassword(string $email, string $code, string $password_new, string $password_new_reentered){
    session_start();
    if (!isset($email) ||!isset($code) || !isset($password_new) || !isset($password_new_reentered)) {
        print_error("Reset error", "", "<p>One or more field are empty</p>");
        die;
    }else if ($password_new != $password_new_reentered) {
        print_error("Password error", "", "<p>Entered passwords are not the same</p>");
        die;
    }

    $password = hashPassword($password_new);

    $database_connection = get_connection_to_game_db();
    $select_player_query = "SELECT secret, email, gametag, USER_ID FROM player WHERE email = ?";
    $statement = $database_connection->prepare($select_player_query);
    $statement->bind_param("s", $email);
    $statement->execute();
    $result = $statement->get_result();

    $query_done = false;
    while ($row = mysqli_fetch_array($result)) {
        $gametag = $row['gametag'];
        $secret = $row['secret'];
        $query_done = true;
    }
    if(!$query_done){
        print_error("Database error","", "<p>Cannot retrieve information about your account.</p>");
        die;
    }else if (!check_code($code, $secret)) {
        print_error("Authentication error","Cannot verify your code", "<p>Entered code is wrong.</p>");
        die;
    }

    $update_query = "UPDATE player SET pass = ? WHERE email = ?";
    $statement = $database_connection->prepare($update_query);
    $statement->bind_param("ss", $password, $email);
    $statement->execute();
    $database_connection->close();
    $message = "Hello " . $gametag . ",\n\nWe inform you that someone changed your personal information. Please contact the customer support if you haven't changed your data.\n\nAffected data: password\n\n\nThis is an automated mail please do not answer";
    $subject = "Account Information";
    // send mail
    mail($email, $subject, $message);
    header("Location: /");
}

updatePassword($_POST['email'], $_POST['code'], $_POST['password_new'], $_POST['password_new_reentered']);

?>