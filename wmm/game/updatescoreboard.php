<?php

    function insertScore($score){
        session_start();
        // Insert only logged in users
        if(isset($_SESSION["user_id"])){
            // establish a connection
            $con = mysqli_connect('localhost','register','1234','game');
            if (!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }
            $gametag = "";
            $score_remote = 0;

            // Select gametag and score associated with loggedin user
            $sql = "SELECT gametag, score FROM player WHERE USER_ID = '" . $_SESSION["user_id"] . "'";
            $result = mysqli_query($con,$sql);
            while($row = mysqli_fetch_array($result)) {
                $gametag = $row['gametag'];
                $score_remote = $row['score'];
            }

            // Update the player score if the new score is higher than the current highscore
            if($score > $score_remote){
                $sql="UPDATE player SET score = " . $score . " WHERE USER_ID = '" . $_SESSION["user_id"] . "'";
                echo $sql;
                $con->query($sql);
                echo  $con->error;
            }

            // Insert the score into the scoreboard
            $sql = "INSERT INTO scoreboard (gametag,score) VALUES ('$gametag', '$score')";
            $con->query($sql);
        }

    }
    if(isset($_GET['score'])){
        insertScore($_GET['score']);
    }
     header("Location: /game/game.php?new");
?>