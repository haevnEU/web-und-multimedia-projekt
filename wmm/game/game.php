<?php

$STYLE = "darkmode";
echo "
    <!DOCTYPE html><html lang=\"en\">
    <head>
        <meta charset=\"UTF-8\">
        <title>Tetris</title>
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/game_blocks.css\">
        <link rel=\"stylesheet\" href=\"http://localhost/styles/$STYLE/game_main.css\"></head>
    <body>
        <div class=\"menu\"><h2>Menu</h2></div>
        <div id=\"canvasDiv\" class=\"game\">
            <canvas id=\"fieldCanvas\"></canvas>
            <script type=\"module\" src=\"./constants.js\">
            </script><script type=\"module\" src=\"./main.js\"></script>
            <script type=\"module\" src=\"./board.js\"></script>
            <script type=\"module\" src=\"./shapes.js\"></script>
            <script type=\"module\" src=\"./theme.js\"></script>
            <script type=\"module\" src=\"./game.js\"></script>
            <script type=\"module\" src=\"./render.js\"></script>
        </div>
        <div class=\"chat\"><h2>Chat</h2></div>
    </body>
    <footer>
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