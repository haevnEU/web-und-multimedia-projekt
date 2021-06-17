<?php
    session_start();
    if(isset($_SESSION["user_id"])){
        header("Location: /error.php?error=" . urlencode("<p>Oooops...</p><p>It seems that you already logged in, please logout.</p>"));
        die("Already logged in, please logout");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
        <link href="/styles/darkmode/centered.css" rel="stylesheet">
        <link href="/styles/basic_style.css" rel="stylesheet">
    </head>
    <body>
    <div class="root_div root_div_color" style="width: 30%;">
        <div class="sub_div sub_div_color">
            <h2 class="heading_color">Register</h2>
            <form action="/scripts/user_creation.php" method="POST">
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">Name *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="first_name" placeholder="First name" required="required" type="text">
                    </label>
                </div>
                <br>
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">Surname *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="sur_name" placeholder="Surname" required="required" type="text">
                    </label>
                </div>
                <br>
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">EMail *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="email" placeholder="EMail" type="email">
                    </label>
                </div>
                <br>
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">Gametag *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="gametag" placeholder="WildCow" required="required" type="text">
                    </label>
                </div>
                <br>
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">Password *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="password" placeholder="" required="required" type="password">
                    </label>
                </div>
                <br>
                <div class="container">
                    <label class="custom_input_heading custom_input_heading_color">Reenter password *</label><br>
                    <label>
                        <input class="custom_input custom_input_color" name="password_verify" placeholder="" required="required" type="password">
                    </label>
                </div>
                <br>
                <div class="container">
                    <input class="custom_button custom_button_color" name="button_name" type="submit" value="Register">
                </div>
                <br>
            </form>
        </div>
    </div>
    </body>
    <footer class="footer">
        <?php include "../common/floating_menu.php"; ?>
    </footer>
</html>