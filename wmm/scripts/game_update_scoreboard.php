<?php
    require "database_utils.php";

    session_start();
    if (!isset($_SESSION["user_id"]) || !isset($_GET['score'])) {
        header("Location: /game/game.php?new");
        die("Access denied, please login");
    }

    $score= $_GET['score'];
    $user_id = $_SESSION["user_id"];
    $database_connection = get_connection_to_game_db();
    $gametag = "";
    $score_remote = 0;
    $account_suspended = false;
    $sql = "SELECT gametag, score, account_suspended FROM player WHERE USER_ID = '" . $user_id . "'";
    $result = mysqli_query($database_connection,$sql);
    while($row = mysqli_fetch_array($result)) {
        $gametag = $row['gametag'];
        $score_remote = $row['score'];
        $account_suspended = $row['account_suspended'];
    }
    if($account_suspended){
        header("Location: /error.php?error=" . urlencode("Your account is suspended, contact the customer service");
       die;
    }

    if($score > $score_remote){
        $sql="UPDATE player SET score = " . $score . " WHERE USER_ID = '" . $user_id . "'";
        $database_connection->query($sql);
    }

    $sql = "INSERT INTO scoreboard (gametag,score) VALUES ('$gametag', '$score')";
    $database_connection->query($sql);

     header("Location: /game/game.php?new");
?>