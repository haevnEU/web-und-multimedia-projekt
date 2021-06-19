<?php
    require "database_utils.php";
    function insertScore($score){
        session_start();

        if(isset($_SESSION["user_id"])){
            $database_connection = get_connection_to_game_db();
            $gametag = "";
            $score_remote = 0;

            $sql = "SELECT gametag, score FROM player WHERE USER_ID = '" . $_SESSION["user_id"] . "'";
            $result = mysqli_query($database_connection,$sql);
            while($row = mysqli_fetch_array($result)) {
                $gametag = $row['gametag'];
                $score_remote = $row['score'];
            }

            if($score > $score_remote){
                $sql="UPDATE player SET score = " . $score . " WHERE USER_ID = '" . $_SESSION["user_id"] . "'";
                echo $sql;
                $database_connection->query($sql);
                echo  $database_connection->error;
            }

            $sql = "INSERT INTO scoreboard (gametag,score) VALUES ('$gametag', '$score')";
            $database_connection->query($sql);
        }

    }
    if(isset($_GET['score'])){
        insertScore($_GET['score']);
    }
     header("Location: /game/game.php?new");
?>