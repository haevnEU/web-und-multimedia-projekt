<?php
// TODO
    require "database_utils.php";
    require "utility.php";

    /**
     *
     * @param int $score
     *
     */
    function writeScoreIntoGameDatabase(int $score){
        session_start();
        if (!isset($_SESSION["user_id"]) || !isset($_GET['score'])) {
            header("Location: /game/game.php?new");
            die;
        }
        $user_id =  $_SESSION["user_id"];
        $database_connection = get_connection_to_game_db();
        $gametag = "";
        $score_remote = 0;
        $account_suspended = 0;


        // All fields are entered, valid and the user does not exists so create a new user
        $create_user_query = "SELECT gametag, score, account_suspended FROM player WHERE USER_ID = ?";
        $statement = $database_connection->prepare($create_user_query);
        $statement->bind_param("s", $user_id);
        if ($statement->execute() !== TRUE) {
            die;
        }

        $row = $statement->get_result()->fetch_assoc();

            $gametag = $row['gametag'];
            $score_remote = $row['score'];
            $account_suspended = $row['account_suspended'];



        if($account_suspended){
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }

        if($score > $score_remote){
            $sql="UPDATE player SET score = " . $score . " WHERE USER_ID = '" . $user_id . "'";
            $database_connection->query($sql);
        }

        $sql = "INSERT INTO scoreboard (gametag,score) VALUES ('$gametag', '$score')";
        $database_connection->query($sql);

        header("Location: /game/game.php?new");
    }

    writeScoreIntoGameDatabase($_GET['score']);

?>