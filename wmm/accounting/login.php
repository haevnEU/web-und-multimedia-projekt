<?php
    require "../scripts/links.php";
    require "../scripts/floating_menu.php";
    
  session_start();
  if(isset($_SESSION["user_id"])){
    header("Location: $page_home");
    die;
  }
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
          <div class=\"sub_div sub_div_color\">
            <h2 class=\"heading_color\">Login</h2>
            <br>
            <form method=\"POST\" action=\"$script_login\">
              <div class=\"container\">
                <label class=\"custom_input_heading\">EMail *</label><br> <input class=\"custom_input\" type=\"email\" name=\"email\" placeholder=\"\">
              </div>
              <br>
              <div class=\"container\">
                <label class=\"custom_input_heading\">Password *</label><br> <input class=\"custom_input\" type=\"password\" name=\"password\" placeholder=\"\" required=\"required\">
              </div>
              <br>
              <div class=\"container\">
                <input type=\"submit\" class=\"custom_button custom_button_color\" name=\"button_name\" value=\"Login\">
              </div>
              <br>
            </form>
          </div>
        </div>
      </body>
      <footer class=\"footer\">
        $floating_menu
      </footer>
    </html>"  
?>