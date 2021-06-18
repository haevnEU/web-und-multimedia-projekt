<!DOCTYPE html>
<html lang="en"><head>
                    <meta charset="UTF-8">
                    <title>Tetris</title>
                    <script type="module" src="./constants.js"></script>
                    <script type="module" src="./main.js"></script>
                    <script type="module" src="./board.js"></script>
                    <script type="module" src="./shapes.js"></script>
                    <script type="module" src="./theme.js"></script>
                    <script type="module" src="./game.js"></script>
                    <script type="module" src="./render.js"></script>
                    <?php include "../scripts/styles.php"; ?>
                    </head>
    <body class="game_body" onload="bodyOnLoad()">
        <div id="canvasDiv" class="game_game">
            <canvas class="game_game_canvas" id="fieldCanvas"></canvas>
        </div>
    </body>
    <footer class="footer">
    <?php
         include "../common/floating_menu.php";
        include "./block_ids.html";
    ?>
    </footer>
</html>