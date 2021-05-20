<?php
require "database.php";
    session_start();


    function checkCredentials($email, $password){
        $database_server_name = "localhost";
        $database_user_name = "register";
        $database_user_password = "1234";
        $database_table_name = "game";
        // Create a database connection
        $connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);   
        if ($connection->connect_error) {
            redirectToError("Database connection failed. " . $conn->connect_error);
            return false;
        } 
    
        

        $remote_mail = "na";
        $remote_pass = "na";
        $remote_salt = "na";
       // Query to verify that the user does not exists.
        $sql = "SELECT email, pass, salt FROM player WHERE email='$email';";
        $result = $connection->query($sql);
        if($result->num_rows == 1){
            $row = $result->fetch_assoc();
            $remote_mail = $row['email'];
            $remote_pass = $row['pass'];  
            $remote_salt = $row['salt'];       
        }else{
            redirectToError("No user found");
            return false;
        }
        $connection->close();
        
        $password_verify = password_verify(($password . $email), $remote_pass);

        if($password_verify){
            redirectToError("PW OK");
        }else{
            session_unset();
            session_destroy();
            redirectToError("PW NOT OK");
        }
        return true;
    }

    $mail = $_POST['email'];
    $password = $_POST['password'];
    
    checkCredentials($mail, $password);

?>