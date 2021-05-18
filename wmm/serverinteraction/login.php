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
    
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    $password_encrypt = generateHash($password . $email);
    
    
    $sql = "SELECT email, pass FROM player WHERE email='$email';";
    $result = $connection->query($sql);
    
    if($result->num_rows < 0){
        $correctPass = ""; 
        foreach ($pdo->query($sql) as $row) {
            $correctPass = $row['pass'];
        }   
        $correctPass = has
    
        printPage("<h2>Note</h2><br><p>Cannot login</p><br><a href=\"./login.html\">click here to retry</a></p>");
    }elseif($password != $password_verify){
        printPage("<h2>Note</h2><br><p>Entered password are not equal <a href=\"./login.html\">click here to return</a></p>");
    }else{
      printPage("<h2>You're logged in</h2>");
    }
    
  
  $connection->close();
?>