<?php
    require "utility.php";
    require "database_utils.php";
    require "sercure_auth_check_code.php";

    /**
     *  This method inserts the user data into a database.
     *  The operation aborts if one of the following events occur
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
     */
    function createUser(string $firstname, string $surname, string $email, string $password, string $passwordVerify, string $gametag, string $code, string $secret, string $phone = ""){
        session_start();

        if(isset($_SESSION['user_id'])){
            header("Location: /");
            die;
        }else if(!isset($firstname) || !isset($surname) || !isset($email) || !isset($password) || !isset($passwordVerify) || !isset($gametag)){
            print_error("Account cannot created", "Missing attribute", "One ore more fields are empty");
            die;
        }else if ($password !== $passwordVerify) {
            print_error("User creation error", "", "Given passwords are not equal");
            die;
        }else if(!check_code($code, $secret)){
            print_error("User creation error", $code . " " . $secret, "Two Factor code not entered or wrong");
            die;
        }

        $password_encrypt = hashPassword($password);

        $database_connection = get_connection_to_game_db();

        $select_player_query = "SELECT email FROM player WHERE email = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $email);
        $statement->execute();
        $result = $statement->get_result();
        if ($result->num_rows > 0) {
            $database_connection->close();
            print_error("User creation error", "", "User already exists.");
            die;
        }

        if (strlen($gametag) > 12) {
            $database_connection->close();
            print_error("User creation error", "", "Entered gametag is to long, only 12 character are allowed");
            die;
        }

        $gametag = createGametag($gametag);

        $create_user_query = "INSERT INTO player (first_name,surname,email,gametag,pass, secret, telephone) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $statement = $database_connection->prepare($create_user_query);
        $statement->bind_param("sssssss", $firstname, $surname, $email, $gametag, $password_encrypt, $secret, $phone);

        if ($statement->execute() === TRUE) {
            header("Location: /");
        } else {
            internal_database_error($database_connection);
            die;
        }
        $database_connection->close();
        $_SESSION["secret2faCode"] = "";
    }

    $phone_number = $_POST['phone'];
    $phone_country = "+49";
    $phone = ($phone_number !== "") ? ($phone_country . " " . $phone_number) : "";

    createUser($_POST['first_name'], $_POST['sur_name'], $_POST['email'], $_POST['password'], $_POST['password_verify'], $_POST['gametag'], $_POST['code'], $_POST['secret'], $phone);

?>