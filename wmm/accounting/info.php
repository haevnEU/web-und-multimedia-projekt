<?php
    session_start();
    if (!isset($_SESSION["user_id"])) {
        header("Location: /error.php?error=" . urlencode("<p>Oooops...</p><p>Access denied to this page, please login.</p>"));
        die("Access denied, please login");
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>User Information</title>
        <?php include "../scripts/styles.php"; ?>
        <script>
            function showMeta() {
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        document.getElementById("meta").innerHTML = this.responseText;
                    }
                };
                xmlhttp.open("GET", "/scripts/user_get_meta_information.php", true);
                xmlhttp.send();
            }

            function downloadMeta() {
                let xmlhttp = new XMLHttpRequest();
                let text = "";
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        text = this.responseText;

                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
                        element.setAttribute('download', 'meta.json');

                        element.style.display = 'none';
                        document.body.appendChild(element);

                        element.click();

                        document.body.removeChild(element);
                    }
                };
                xmlhttp.open("GET", "/scripts/user_get_meta_information.php?json", true);
                xmlhttp.send();
            }
        </script>
    </head>
    <body onload="showMeta()">
        <div class="root_div root_div_color" style="width: 30%;">
            <div class="sub_div sub_div_color">
                <h2 class="heading_color">Settings</h2>
                <div class="container" id="meta"></div>
                <br>
                <div class="container horizontal_centered">
                    <button class="custom_button custom_button_color" onclick="downloadMeta()">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px"
                             viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
                            <g><rect fill="none" height="24" width="24"/></g>
                            <g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"/></g>
                        </svg>
                    </button>
                    <button class="custom_button custom_button_color" onclick="history.back()">
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
