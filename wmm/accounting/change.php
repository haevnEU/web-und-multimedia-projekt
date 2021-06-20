<?php
    session_start();
    if (!isset($_SESSION["user_id"])) {
        die("Access denied, please login");
    }
?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>User Information</title>
        <?php include "../scripts/styles.php"; ?>
    </head>
    <body onload="loadSettings()">
        <div class="root_div root_div_color" style="width: 30%;">
            <div class="sub_div sub_div_color">
                <h2 class="heading_color">$ATTR</h2>
                <br>
                <form method="POST" action="/scripts/user_update_settings.php">
                    <?php
                        $DUMMY = "HELLO";
                        include("../scripts/get_attribute_to_change.php"); ?>
                    <br>
                    <div class="container horizontal_centered">
                        <div class="tooltip">
                            <span class="tooltiptext">Save changes</span>
                            <button type="submit" class="custom_button custom_button_color" name="button_name">
                               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg>
                            </button>
                        </div>

                        <div class="tooltip">
                            <span class="tooltiptext">Request meta data</span>
                            <button type="button" class="custom_button custom_button_color" onclick="location.href='info.php';">
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                                     viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                                    <rect fill="none" height="24" width="24"/>
                                    <path d="M13.17,4L18,8.83V20H6V4H13.17 M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2L14,2z M12,14 c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C10,13.1,10.9,14,12,14z M16,17.43c0-0.81-0.48-1.53-1.22-1.85 C13.93,15.21,12.99,15,12,15c-0.99,0-1.93,0.21-2.78,0.58C8.48,15.9,8,16.62,8,17.43V18h8V17.43z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "../common/floating_menu.php" ?>
    </footer>
</html>