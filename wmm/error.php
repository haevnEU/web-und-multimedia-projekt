<html>
    <head>
        <?php include "./scripts/styles.php"; ?>
    </head>
    <body>
        <div class="root_div root_div_color" style="width:50%; height:50%">
            <div class="container">
                <h2 class="heading_color">Error</h2>
                <?php if (isset($_GET['error'])) {
                    echo "<div class=\"error horizontal_centered\">" . $_GET['error'] . "</div>";
                } else {
                    echo "<p class=\"error horizontal_centered\">You should not see this page please contact the support</p>";
                } ?>
                <br>
                <div class="horizontal_centered">
                    <button class="custom_button custom_button_color" onclick="history.back()">Back</button>
                    <button class="custom_button custom_button_color" onclick="onclick=" location.href='/';>Home</button>
                </div>
                <br>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "./common/floating_menu.php" ?>
    </footer>
</html>