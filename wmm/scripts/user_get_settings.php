<?php
    require "database_utils.php";
    require "utility.php";
    session_start();
    if (!isset($_SESSION["user_id"])) {
        print_error("Authentication Error", "Access denied", "<p>Ooooops... you are not logged in");
        die;
    }


        $database_connection = get_connection_to_game_db();

        $select_player_query = "SELECT * FROM player WHERE USER_ID = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $_SESSION["user_id"]);
        $statement->execute();
        $result = $statement->get_result();


        while ($row = mysqli_fetch_array($result)) {
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Theme</label>               <br><select class=\"custom_input\" name=\"theme\"><option selected=\"selected=\">" . $row['style'] . "</option><option>lightmode</option><option>darkmode</option><option>newmode</option></select></div><br>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Old Password</label>        <br> <input class=\"custom_input\" type=\"password\" name=\"password_old\"></div>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">New Password</label>        <br> <input class=\"custom_input\" type=\"password\" name=\"password_new\"></div>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Reenter new Password</label><br> <input class=\"custom_input\" type=\"password\" name=\"password_new_reentered\"></div><br>";
        }

        $database_connection->close();

?>