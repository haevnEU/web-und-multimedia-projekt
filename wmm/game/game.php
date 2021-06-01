<?php
// TODO REWORK!
    require "../scripts/links.php";
    require "../scripts/floating_menu.php";
    session_start();
    $friend_menu = "";
   
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

    print "<!DOCTYPE html><html lang=\"en\">";
    print $HEAD;
    print "<body>
        <div id=\"canvasDiv\" class=\"game\">    
            <canvas class=\"game_canvas\" id=\"fieldCanvas\"></canvas>
        </div>
    </body>";

    print "<footer class=\"footer\">$floating_menu $FOOTER_CONTENT</footer>";
    print "</html>";
?>