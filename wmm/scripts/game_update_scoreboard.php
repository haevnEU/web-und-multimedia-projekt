<?php
    require "database_utils.php";
    require "utility.php";

    /**
     * @brief Writes the score into the database
     * @details This method retrieves the current highscore from the user, compares it with the reached one and updates,
     * if the reached score is higher. The reached score is also written to the general highscore table.
     * The operation aborts if one of the following cases are fulfilled.
     *  - User is not logged in
     *  - User is suspended
     *  - Generic database error
     * @param int $score Reached score
     */
    function writeScoreIntoGameDatabase(int $score){
        session_start();
        if (!isset($_SESSION['user_id']) || !isset($_GET['score'])) {
            header("Location: /game/game.php?new");
            die;
        }
        $user_id =  $_SESSION["user_id"];

        $database_connection = get_connection_to_game_db();
        $statement = $database_connection->prepare("SELECT gametag, score, account_suspended FROM player WHERE USER_ID = ?");
        $statement->bind_param("s", $user_id);
        if ($statement->execute() !== TRUE) {
            $database_connection->close();
            header("Location: /game/game.php?new");
            die;
        }

        $remote_data = $statement->get_result()->fetch_assoc();
        $gametag = $remote_data['gametag'];
        $score_remote = $remote_data['score'];
        $account_suspended = $remote_data['account_suspended'];


        if($account_suspended){
            $database_connection->close();
            print_error("Account error","Suspended Account", "<p>Your account was suspended.</p><br><a href=\"/support/suspended.php\">Contact the customer service for more information</a>");
            die;
        }

        if($score > $score_remote){
            $create_user_query = "UPDATE player SET score = ? WHERE USER_ID = ?";
            $statement = $database_connection->prepare($create_user_query);
            $statement->bind_param("is", $score, $user_id);
            if ($statement->execute() !== TRUE) {
                $database_connection->close();
                header("Location: /game/game.php?new");
                die;
            }
        }

        $create_user_query = "INSERT INTO scoreboard (gametag,score) VALUES (?, ?)";
        $statement = $database_connection->prepare($create_user_query);
        $statement->bind_param("si", $gametag, $score);
        if ($statement->execute() !== TRUE) {
            $database_connection->close();
            header("Location: /game/game.php?new");
            die;
        }
        header("Location: /game/game.php?new");
    }

    writeScoreIntoGameDatabase($_GET['score']);

?>