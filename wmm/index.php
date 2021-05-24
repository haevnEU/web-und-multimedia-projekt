<?php
require "./accounting/links.php";

echo "<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\">        
    <title>Login</title>
    <link rel=\"stylesheet\" href=\"http://localhost/styles/darkmode/centered.css\">
    <link rel=\"stylesheet\" href=\"http://localhost/styles/basic_style.css\">
  </head>
    <body\">
      <div class=\"root_div root_div_color\" style=\"width: 30%;\">
        <div class=\"sub_div\">
          <h1 class=\"heading_color\">Tetris</h1>
          <div class=\"horizontal_centered\">
            <p>Welcome to Tetris</p> 
            <p>Version 1.0</p>
            <p>If you encounter any problems please contact the support via the help link</p>
            <br>
            <input class=\"custom_button custom_button_color\" type=\"button\" onclick=\"location.href='$page_login';\" value=\"Login\" />
            <input class=\"custom_button custom_button_color\" type=\"button\" onclick=\"location.href='$page_register';\" value=\"Register\" />
            <input class=\"custom_button custom_button_color\" type=\"button\" onclick=\"location.href='$page_game';\" value=\"Play\" />
            </div>
            <br>
            <div class=\"horizontal_centered\"><a href=\"http://localhost/support/helpme.html\">Help</a>  <a href=\"./credits.html\">Credits</a> <a href=\"./license.html\">Licenses</a></div>
        </div>
        
      </div>
    </body>
    <foot>
    </footer>
</html>";

?>