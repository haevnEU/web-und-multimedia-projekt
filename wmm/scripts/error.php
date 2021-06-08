<?php
    require "../scripts/links.php";
    require "../scripts/floating_menu.php";
    
    if(isset($_GET['error'])){
        $message = $_GET['error'];
        echo "<html>
            <head>
            <link rel=\"stylesheet\" href=\"http://localhost/styles/darkmode/centered.css\">
            <link rel=\"stylesheet\" href=\"http://localhost/styles/basic_style.css\">
            </head>
            <body>
                <div class=\"root_div root_div_color\">
                    <div class=\"container\">
                    <h2 class=\"heading_color\">Error</h2>
                    <p class=\"error horizontal_centered\">$message</p><br>
                    <div class=\"horizontal_centered\">
                        <button class=\"custom_button custom_button_color\" onclick=\"location.href = '$page_register';\">Register</button>
                        <button class=\"custom_button custom_button_color\" onclick=\"location.href = '$page_login';\">Login</button>
                    </div>
                    </div></div>
            </body>
            <footer class=\"footer\">
                $floating_menu
            </footer>
        </html>";
    }else{
        header("Location: $page_home");
    }
?>


