<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Error</title>
        <?php include "./scripts/styles.php"; ?>
    </head>
    <body>
        <div class="root_div root_div_color" style="width:50%; height:50%">
            <div class="container">
                <?php
                if(!isset($_GET['error'])){
                echo "NOOOO";
                    die;
                }

                echo "<div class=\"horizontal_centered\">";
                if(isset($_GET['header'])){
                    echo "<h1 class=\"error\">" . $_GET['header'] . "</h1>";
                }
                if (isset($_GET['subheader'])) {
                    echo "<h2>" . $_GET['subheader'] . "</h2>";
                }
                if(isset($_GET['error'])){
                    echo "<p>" . $_GET['error'] . "</p>";
                }
                echo "</div";
                ?>
                <br>
                <div class="horizontal_centered">
                    <button type="button" class="custom_button custom_button_color" onclick="history.back()">Back</button>
                    <button type="button" class="custom_button custom_button_color" onclick="location.href='/'";>Home</button>
                </div>
                <br>
            </div>
        </div>
    </body>
    <footer class="footer">
        <?php include "./common/floating_menu.php" ?>
    </footer>
</html>