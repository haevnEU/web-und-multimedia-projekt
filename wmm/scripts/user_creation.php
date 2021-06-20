<?php
    require "utility.php";
    require "database_utils.php";

    if (!(isset($_POST['first_name']) && isset($_POST['sur_name'])
        && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['password_verify'])
        && isset($_POST['gametag']))) {
        redirectToError("Please fill out every field");
    }

    $first_name = $_POST['first_name'];
    $family_name = $_POST['sur_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_verify = $_POST['password_verify'];
    $gametag = $_POST['gametag'];
    if(isset($_POST['phone'])){
        $phone = $_POST['phone'];
    }else{
        $phone = "";
    }

    // Validate if passwords are same
    list ($password_encrypt, $salt) = hashPassword($password);
    if ($password != $password_verify) {
        redirectToError("Entered password are different");
        return;
    }
    $database_connection = get_connection_to_game_db();

    $select_player_query = "SELECT email FROM player WHERE email = ?";
    $statement = $database_connection->prepare($select_player_query);
    $statement->bind_param("s", $email);
    $statement->execute();
    $result = $statement->get_result();
    if ($result->num_rows > 0) {
        redirectToError("Entered email already exists");
        $database_connection->close();
        die;
    }

    if (strlen($gametag) > 12) {
        redirectToError("Entered gametag is to long, only 10 character are allowed");
        $database_connection->close();
        die;
    }

    $gametag = createGametag($gametag);

    // All fields are entered, valid and the user does not exists so create a new user
    $create_user_query = "INSERT INTO player (first_name,surname,email,gametag,pass,salt, telephone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $statement = $database_connection->prepare($create_user_query);

    $statement->bind_param("sssssss", $first_name, $family_name, $email,$gametag, $password_encrypt, $salt, $phone);

    if ($statement->execute() === TRUE) {
        header("Location: /");
    } else {
        redirectToError("database error: " . $connection . error);
    }
    $database_connection->close();
?>