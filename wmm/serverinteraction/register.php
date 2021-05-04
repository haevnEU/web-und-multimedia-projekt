<?php
$servername = "localhost";
$username = "register";
$password = "1234";
$dbname = "game";
define("MAX_LENGTH", 12);


function generateHash($password) {
    if (defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH) {
        $salt = '$2y$11$' . substr(md5(uniqid(rand(), true)), 0, 22);
        return crypt($password, $salt);
    }
}

function printPage($message){
    echo "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>Register</title><link rel=\"stylesheet\" href=\"./centered.css\"></head><body style=\"background-color:grey;width: 100%; height: 100%; margin: 0;\"><div class=\"parent_div_centered\">
            <div class=\"child_div_centered\">
                $message
            </div></body></html>";
}

// Create connection
$connection = new mysqli($servername, $username, $password, $dbname);   
    if ($connection->connect_error) {
        echo "Connection failed: " . $conn->connect_error; 
        die("Connection failed: " . $conn->connect_error);
    } 
    
    $first_name = $_POST['first_name'];
    $surname = $_POST['sur_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_verify = $_POST['password_verify'];
    $gametag = $_POST['gametag'];
    
    $password_encrypt = generateHash($password . $email);
    
    
    $sql = "SELECT email FROM player WHERE email='$email';";
    $result = $connection->query($sql);
    if($result->num_rows > 0){
        printPage("<h2>Note</h2><br>
        <p>User already exists</p><br>
        <a href=\"./login.html\">click here to login</a> and <a href=\"./register.html\">here to register</a></p>");
    }elseif($password != $password_verify){
        printPage("<h2>Note</h2><br><p>Entered password are not equal <a href=\"./register.html\">click here to return</a></p>");
    }else{
        $sql = "INSERT INTO player (first_name,surname,email,gametag,pass) VALUES ('$first_name', '$surname', '$email', '$gametag', '$password_encrypt')";

        if ($connection->query($sql) === TRUE) {
            printPage("<h2>Congratulation</h2><p>You account was successfully created</p><br><button type=\"button\" onclick=\"location.href = './login.php';\">Login</button>");
        } else {
            
            printPage("<h2>Error occurred</h2<br><p>An error occurred during account creation.</p><br><p> $sql </p><br><p> $connection->error</p>");
        }
    }
    
  
  $connection->close();
?>