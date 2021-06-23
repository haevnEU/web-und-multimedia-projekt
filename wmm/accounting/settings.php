<?php
    require "../scripts/utility.php";
    session_start();
    if (!isset($_SESSION["user_id"])) {
        print_error("Authentication error", "", "<p>Ooops...</p><p>Access denied to this page, please login.</p>");
        die;
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Settings</title>
        <?php include "../scripts/styles.php"; ?>
        <script>
            function showMeta() {
                let dataRequest = new XMLHttpRequest();
                dataRequest.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById("meta").innerHTML = this.responseText;
                    }
                };
                dataRequest.open("GET", "/scripts/user_get_settings.php", true);
                dataRequest.send();
            }

        </script>
    </head>
    <body onload="showMeta()">
        <div class="root_div root_div_color" style="width: 30%;">
            <div class="sub_div sub_div_color">
                <h2 class="heading_color">Settings</h2>
                <div class="container">
                    <?php if(isset($_GET['done'])){ echo "<p>Settings update</p>"; }?>
                </div>
                <div class="container" id="meta"></div>
                <br>
                <div class="container horizontal_centered">
                    <button aria-label="Go back" class="custom_button custom_button_color" onclick="history.back()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "../common/floating_menu.php" ?>
    </footer>
</html>
