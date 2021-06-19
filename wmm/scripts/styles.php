<?php
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    echo "<link rel=\"stylesheet\" href=\"/styles/basic_style.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/tooltip.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/chat_popup.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/table.css\">\n";

    if (isset($_SESSION["style"])) {
        $style = $_SESSION["style"];
        $style_path = "../styles/" . $style;
    } else {
        $style = "darkmode";
    }
    echo "<link rel=\"stylesheet\" href=\"/styles/" . $style . "/centered.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/" . $style . "/chat.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/" . $style . "/game_blocks.css\">\n";
    echo "<link rel=\"stylesheet\" href=\"/styles/" . $style . "/game_main.css\">\n";
?>