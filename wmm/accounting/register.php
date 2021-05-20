<?php

require "utility.php";


function createUser($first_name, $family_name, $email, $gametag, $password, $password_verify){
    // Validate if passwords are same
    list ($password_encrypt, $salt) = hashPassword($password . $email);
    if($password != $password_verify){
        redirectToError("Entered password are different");
        return;    
    }


    $database_server_name = "localhost";
    $database_user_name = "register";
    $database_user_password = "1234";
    $database_table_name = "game";
    // Create a database connection
    $connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);   
    if ($connection->connect_error) {
        redirectToError("Database connection failed. " . $conn->connect_error);
        return;
    } 

    // Query to verify that the user does not exists.
    $sql = "SELECT email FROM player WHERE email='$email';";
    $result = $connection->query($sql);
    if($result->num_rows > 0){
        redirectToError("Entered email already exists");
        return;
    }

    if(strlen($gametag) > 10){
        redirectToError("Entered gametag is to long, only 12 character are allowed");
        return;
    }

    $gametag = createGametag($gametag);

    // All fields are entered, valid and the user does not exists so create a new user
    $sql = "INSERT INTO player (first_name,surname,email,gametag,pass,salt) VALUES ('$first_name', '$family_name', '$email', '$gametag', '$password_encrypt', '$salt')";
    if ($connection->query($sql) === TRUE) {    
        header("Location: ./login.html");
    } else {
        redirectToError("database error: " . $connection.error);
    }
    $connection->close();
}

if(!(isset($_POST['first_name']) && isset($_POST['sur_name']) 
    && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['password_verify']) 
    && isset($_POST['gametag']))){
        redirectToError("Please fill out every field");
}

$first_name = $_POST['first_name'];
$family_name = $_POST['sur_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password_verify = $_POST['password_verify'];
$gametag = $_POST['gametag'];
createUser($first_name, $family_name, $email, $gametag, $password, $password_verify);

?>