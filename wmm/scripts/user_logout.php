<?php
    require "links.php";
    session_start();
    $_SESSION = [];
    session_unset();
    session_destroy();
    header("Location: $page_home");
?>