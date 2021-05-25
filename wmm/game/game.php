<?php
require "../scripts/links.php";
require "../scripts/floating_menu.php";
$STYLE = "darkmode";
session_start();
$friend_menu = "";
if(isset($_SESSION["user_id"])){
    $friend_menu = "<div class=\"chat\"><h2>Chat</h2></div>";
}
echo "
    <!DOCTYPE html><html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\">
        <title>Tetris</title>
        <script type=\"module\" src=\"./constants.js\"></script>
        <script type=\"module\" src=\"./main.js\"></script>
        <script type=\"module\" src=\"./board.js\"></script>
        <script type=\"module\" src=\"./shapes.js\"></script>
        <script type=\"module\" src=\"./theme.js\"></script>
        <script type=\"module\" src=\"./game.js\"></script>
        <script type=\"module\" src=\"./render.js\"></script>
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/game_blocks.css\">
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/game_main.css\"></head>
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/centered.css\">
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/chat.css\">
        <link rel=\"stylesheet\" href=\"http://localhost/styles/basic_style.css\">
    <body>
        <div class=\"menu\"><h2>Menu</h2></div>
        <div id=\"canvasDiv\" class=\"game\">
        
            <canvas class=\"game_canvas\" id=\"fieldCanvas\"></canvas>
        </div>
        $friend_menu
    </body>
    <footer class=\"footer\">
       
        $floating_menu
        <span class=\"background_\"></span>
        <span class=\"background_preview\"></span>
        <span class=\"board\"></span>
        <span class=\"font_\"></span>
        <span class=\"blockID254\"></span>
        <span class=\"blockID255\"></span>
        <span class=\"blockID1\"></span>
        <span class=\"blockID2\"></span>
        <span class=\"blockID3\"></span>
        <span class=\"blockID4\"></span>
        <span class=\"blockID5\"></span>
        <span class=\"blockID6\"></span>
        <span class=\"blockID7\"></span>
        <span class=\"blockID8\"></span>
        <span class=\"blockID9\"></span>
        <span class=\"blockID10\"></span>
        <span class=\"blockID11\"></span>
    </footer></html>
"

?>