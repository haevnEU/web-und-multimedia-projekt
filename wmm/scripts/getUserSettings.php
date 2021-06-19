<?php
    session_start();
    if (isset($_SESSION["user_id"])) {
        $database_connection = mysqli_connect('localhost', 'register', '1234', 'game');
        if (!$database_connection) {
            echo "<p>Cannot retrieve settings.</p>";
            die('Could not connect: ' . mysqli_error($database_connection));
        }

        $select_player_query = "SELECT * FROM player WHERE USER_ID = ?";
        $statement = $database_connection->prepare($select_player_query);
        $statement->bind_param("s", $_SESSION["user_id"]);
        $statement->execute();
        $result = $statement->get_result();


        while ($row = mysqli_fetch_array($result)) {
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Theme</label>               <br><select class=\"custom_input\" name=\"theme\"><option selected=\"selected=\">" . $row['style'] . "</option><option>lightmode</option><option>darkmode</option></select></div><br>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Old Password</label>        <br> <input class=\"custom_input\" type=\"password\" name=\"password_old\"></div>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">New Password</label>        <br> <input class=\"custom_input\" type=\"password\" name=\"password_new\"></div>";
            echo "<div class=\"container\"><label class=\"custom_input_heading\">Reenter new Password</label><br> <input class=\"custom_input\" type=\"password\" name=\"password_new_reentered\"></div><br>";
        }

        mysqli_close($database_connection);
    }
?>