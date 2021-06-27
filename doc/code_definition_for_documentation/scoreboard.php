<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Register</title>
    <?php include "../scripts/styles.php"; ?>
    <script>
        function loadScoreboard() {
            let xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("scoreboard").innerHTML = this.responseText;
                }
            };
            xmlhttp.open("GET", "/scripts/game_get_scoreboard.php", true);
            xmlhttp.send();
        }
    </script>
</head>
<body onload="loadScoreboard()">
<div class="root_div root_div_color" style="width: 30%;">
    <div class="sub_div sub_div_color">
        <h2 class="heading_color">Scoreboard</h2>
        <div class="container" id="scoreboard"></div>
        <br>
        <br>
        <button type="button" class="custom_button custom_button_color center" onclick="history.back()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
        </button>
    </div>
</div>
</body>
<footer class="footer">
    <?php include "../common/floating_menu.php" ?>
</footer>
</html>
