<?php
require "database.php";

$first_name = $_POST['first_name'];
$family_name = $_POST['sur_name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password_verify = $_POST['password_verify'];
$gametag = $_POST['gametag'];

function createUser($first_name, $family_name, $email, $gametag, $password, $password_verify){
  
    // Validate if passwords are same
    //list ($password_encrypt, $salt) = generateHash($password . $email);
    $password_encrypt = generateHash($password . $email);
    $salt = "";
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
        showErrorPage("Database connection failed. " . $conn->connect_error);
        return;
    } 

    // Query to verify that the user does not exists.
    $sql = "SELECT email FROM player WHERE email='$email';";
    $result = $connection->query($sql);
    if($result->num_rows > 0){
        redirectToError("Entered email already exists");
        return;
    }

    // All fields are entered, valid and the user does not exists so create a new user
    $sql = "INSERT INTO player (first_name,surname,email,gametag,pass,salt) VALUES ('$first_name', '$family_name', '$email', '$gametag', '$password_encrypt', '$salt')";
    if ($connection->query($sql) === TRUE) {
        //    PRODUCTION HEADER
        //    header("Location: http://localhost/account/login.php");
        
        //  TEST HEADER
            header("Location: http://localhost/scratch/accounting/login.html");
    } else {
        redirectToError("database error: " . $connection.error);
    }
    $connection->close();
}

createUser($first_name, $family_name, $email, $gametag, $password, $password_verify);

?>