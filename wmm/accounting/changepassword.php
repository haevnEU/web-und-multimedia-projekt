<?php

    session_start();
    if (!isset($_SESSION["user_id"])) {
        print_error("Authentication error", "", "<p>Ooops...</p><p>Access denied to this page, please login.</p>");
        die("Access denied, please login");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Change Password</title>
        <?php include "../scripts/styles.php"; ?>
    </head>
    <body>
        <div class="root_div root_div_color" style="width: 30%;">
            <div class="sub_div sub_div_color">
                <h2 aria-label="Password change form" class="heading_color">Change password</h2>
                <div class="container">
                   <form method="POST" action="/scripts/user_change_password.php">
                        <div class="container">
                            <label aria-hidden="true" class="custom_input_heading">Old Password *</label><br> <input aria-label="Current password" class="custom_input" type="password" name="password_old" placeholder="" required="required">
                        </div>
                        <br>
                        <div class="container">
                            <label aria-hidden="true"  class="custom_input_heading">New password *</label><br> <input aria-label="New password" class="custom_input" type="password" name="password_new" placeholder="" required="required">
                        </div>
                        <br>
                        <div class="container">
                            <label aria-hidden="true"  class="custom_input_heading">Reenter new password *</label><br> <input aria-label="Enter new password" class="custom_input" type="password" name="password_new_reentered" placeholder="" required="required">
                        </div>
                        <br>
                        <div class="container horizontal_centered">
                            <button aria-label="Save new password" class="custom_button custom_button_color">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                            </button>
                            <button aria-label="Go back" class="custom_button custom_button_color" onclick="history.back()">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                    <path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "../common/floating_menu.php" ?>
    </footer>
</html>
