<html>
    <head>
        <link rel="stylesheet" href="/styles/darkmode/centered.css">
        <link rel="stylesheet" href="/styles/basic_style.css">
    </head>
    <body>
        <div class="root_div root_div_color">
            <div class="container">
                <h2 class="heading_color">Error</h2>
                <?php
                      if(isset($_GET['error'])){
                         echo "<div class=\"error horizontal_centered\">" . $_GET['error'] . "</div>";
                      }else {
                            echo "<p class=\"error horizontal_centered\">You should not see this page please contact the support</p>";
                      }
                ?>
                </p><br>
                <div class="horizontal_centered">
                    <button class="custom_button custom_button_color" onclick="location.href = '/';">Home</button>
                </div>
                <br>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "./common/floating_menu.php" ?>
    </footer>
</html>