<?php
    session_start();
    if(isset($_SESSION["theme"])){
        $STYLE = $_SESSION["theme"];
    }else{
        $STYLE = "dark";
    }
    if(strtolower($STYLE) == "light"){
        $HEAD = file_get_contents("./html_files/light_mode_header.html");
    }else{
        $HEAD = file_get_contents("./html_files/dark_mode_header.html");
    }
    $FOOTER_CONTENT = file_get_contents("./html_files/footer.html");

?>

<!DOCTYPE html>
<html lang="en">
    <?php echo $HEAD; ?>
    <body onload="bodyOnLoad()">
        <div id="canvasDiv" class="game">
            <canvas class="game_canvas" id="fieldCanvas"></canvas>
        </div>
    </body>
    <footer class="footer">
    <?php
         include "../common/floating_menu.php";
         echo $FOOTER_CONTENT;
    ?>
    </footer>
</html>