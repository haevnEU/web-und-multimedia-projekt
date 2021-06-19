<?php
    session_start();
    if (!isset($_SESSION["user_id"])) {
        "<p>Oooops...</p><p>Access denied to this page, please login.</p>";
        die("Access denied, please login");
    }
    $database_connection = mysqli_connect('localhost', 'register', '1234', 'game');
    if (!$database_connection) {
        echo "<p>Cannot retrieve user info.</p>";
        die('Could not connect: ' . mysqli_error($database_connection));
    }

    $select_player_query = "SELECT * FROM player WHERE USER_ID = ?";
    $statement = $database_connection->prepare($select_player_query);
    $statement->bind_param("s", $_SESSION["user_id"]);
    $statement->execute();
    $result = $statement->get_result();

    if (isset($_GET['json'])) {
        while ($row = mysqli_fetch_array($result)) {
            echo "{\"Firstname\":\"" . $row['first_name'] . "\",";
            echo "\"Surname\":\"" . $row['surname'] . "\",";
            echo "\"Gametag\":\"" . $row['gametag'] . "\",";
            echo "\"Accounttype\":\"" . $row['account_type'] . "\",";
            echo "\"EMail\":\"" . $row['email'] . "\",";
            echo "\"State\":\"" . $row['state'] . "\",";
            echo "\"Motto\":\"" . $row['motto'] . "\",";
            echo "\"Style\":\"" . $row['style'] . "\",";
            echo "\"Score\":\"" . $row['score'] . "\"}";
        }
    } else {
        echo "<table></thead>";
        while ($row = mysqli_fetch_array($result)) {
            echo "<tr>";
            echo "<td>Firstname</td><td>" . $row['first_name'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Surname</td><td>" . $row['surname'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Gametag</td><td>" . $row['gametag'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>EMail</td><td>" . $row['email'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Accounttype</td><td>" . $row['account_type'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>State</td><td>" . $row['state'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Motto</td><td>" . $row['motto'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Score</td><td>" . $row['score'] . "</td>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>Style</td><td>" . $row['style'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    mysqli_close($database_connection);
?>