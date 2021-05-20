<?php

if(isset($_GET['error'])){
    $message = $_GET['error'];
    echo "<html><head><link rel=\"stylesheet\" href=\"http://localhost/styles/centered.css\"></head><body><div class=\"mitte\"><div class=\"container\"><h2>Error</h2><p>$message</p><br><button onclick=\"location.href = 'http://localhost/scratch/accounting/register.html';\">Register</button><button onclick=\"location.href = './login.html';\">Login</button></div></div></body></html>";
}else{
    header("Location: http://localhost");
}
?>


