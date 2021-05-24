<?php
    $email = $_POST['mail'];
    $problem = $_POST['problem'];

    echo "
    <!DOCTYPE html>
    <html lang=\"en\">
      <head>
        <meta charset=\"UTF-8\">        
        <title>Login</title>
        <link rel=\"stylesheet\" href=\"http://localhost/styles/darkmode/centered.css\">
        <link rel=\"stylesheet\" href=\"http://localhost/styles/basic_style.css\">
      </head>
        <body>
          <div class=\"root_div root_div_color\" style=\"width: 30%\">
            <div class=\"sub_div sub_div_color horizontal_centered\">
            <h2 class=\"heading_color\">Next steps</h2>
            <br>
            <p>You are summoning a mighty gamemaster from the Support area</p>
            <p>This ritual takes a couple hours or days, your personal gamemaster will contact you via mail</p>
            <p>Good luck on your journey!</p>
            <br><br>
            <input class=\"custom_button custom_button_color\" type=\"button\" onclick=\"location.href='http://localhost';\" value=\"Home\" />
            <br><br>
          </div>
          </div>
        </body>
    </html>"  
?>