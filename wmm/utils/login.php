<?php
   require "internal_links.php";
   require "database.php";
   session_start();

   function login($email, $password){
        // User already logged in so redirect to home
        if(isset($_SESSION["user_id"]){
            // TODO add link
            header("Location: ");
        }
        if(!does_user_exists($email)){
            header("Location: /error.php?error=" . urlencode("User $email does not exists"));
            die("User does not exists");
        }
        $password_remote = get_user_password($email);

   }

   function checkCredentials($email, $password){
        // check cookies
        if(!isset($_SESSION["user_id"])){
            $database_server_name = "localhost";
            $database_user_name = "register";
            $database_user_password = "1234";
            $database_table_name = "game";

            $remote_mail = "";
            $remote_pass = "";
            $remote_salt = "";
            $remote_USER_ID = "";
            // Create a database connection
            $connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
            if ($connection->connect_error) {
                redirectToError("Database connection failed. " . $conn->connect_error);
                return false;
            }

            $sql = "SELECT email, pass, salt, USER_ID FROM player WHERE email='$email';";
            $result = $connection->query($sql);
            if($result->num_rows == 1){
                $row = $result->fetch_assoc();
                $remote_mail = $row['email'];
                $remote_pass = $row['pass'];
                $remote_salt = $row['salt'];
                $remote_USER_ID = $row['USER_ID'];
            }else{
                redirectToError("No user found");
                return false;
            }

            $connection->close();


            if(!verifyPassword($password, $remote_salt, $remote_pass)){
                redirectToError("Password is wrong<br>" . $password . "<br>". $remote_pass);
                return false;
            }

            $_SESSION["user_id"] = $remote_USER_ID;
            return true;
        }

        return true;
    }

    if(checkCredentials($mail, $password)){
        echo "<h2>HELLO USER " . $_SESSION["user_id"] . "</h2><br><a href=\"$script_logout\">Logout</a>";
    }else{
        redirectToError("Cannot log in");
    }
?>