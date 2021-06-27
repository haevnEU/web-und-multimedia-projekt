<?php
    require "utility.php";
    require "database_utils.php";
    require "sercure_auth_check_code.php";

    /**
     * @brief Creates a new user account
     * @details This method creates a new user account .
     * The operation aborts if one of the following cases are fulfilled.
     *  - User is logged in
     *  - One argument is not provided
     *  - Provided password differs
     *  - The account already exists
     *  - Provided gametag is to long
     * @param string $firstname non optional
     * @param string $surname non optional
     * @param string $email non optional
     * @param string $password non optional
     * @param string $passwordVerify non optional
     * @param string $gametag non optional
     * @param string $code non optional
     * @param string $secret non optional
     * @param string $phone optional
     * @since v1.0.0.0
     */
    function createUser(string $firstname, string $surname, string $email, string $password, string $passwordVerify, string $gametag, string $code, string $secret, string $phone = ""){
        session_start();
        $error_type = "Account cannot created";
        if(isset($_SESSION['user_id'])){
            // User is logged in redirect to an error page
            header("Location: /");
            die;
        }else if(!isset($firstname) || !isset($surname) || !isset($email) || !isset($password) || !isset($passwordVerify) || !isset($gametag)){
            // One attribute is missing redirect to an error page
            print_error($error_type, "Missing attribute", "One ore more fields are empty");
            die;
        }else if ($password !== $passwordVerify) {
            // Passwords arent the same redirect to an error page
            print_error($error_type, "", "Given passwords are not equal");
            die;
        }else if(!check_code($code, $secret)){
            // The 2FA code isn't valid redirect to an error page
            print_error($error_type, $code . " " . $secret, "Two Factor code not entered or wrong");
            die;
        }

        $password_encrypt = hashPassword($password);

        $database_connection = get_connection_to_game_db();

        // Check if a mial exists
        $select_player_query = "SELECT email FROM player WHERE email = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $email);
        $statement->execute();
        $result = $statement->get_result();
        if ($result->num_rows > 0) {
            $database_connection->close();
            print_error($error_type, "", "User already exists.");
            die;
        }

        if (strlen($gametag) > 12) {
            // The gametag is to long redirect to an error page
            $database_connection->close();
            print_error($error_type, "", "Entered gametag is to long, only 12 character are allowed");
            die;
        }

        $gametag = createGametag($gametag);

        $create_user_query = "INSERT INTO player (first_name,surname,email,gametag,pass, secret, telephone) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $statement = $database_connection->prepare($create_user_query);
        $statement->bind_param("sssssss", $firstname, $surname, $email, $gametag, $password_encrypt, $secret, $phone);

        if ($statement->execute() === TRUE) {
            // User was created redirect to login
            $database_connection->close();
            header("Location: /accounting/login.php");
        } else {
            // Generic database error
            internal_database_error($database_connection);
            die;
        }
        unset($_SESSION['secret2faCode']);
    }

    /// Entered telephone number without country code
    $phone_number = $_POST['phone'];
    /// Country code, default germany
    $phone_country = "+49";
    /// Full telephone number containing country code and the number
    $phone = ($phone_number !== "") ? ($phone_country . " " . $phone_number) : "";

    createUser($_POST['first_name'], $_POST['sur_name'], $_POST['email'], $_POST['password'], $_POST['password_verify'], $_POST['gametag'], $_POST['code'], $_POST['secret'], $phone);

?>