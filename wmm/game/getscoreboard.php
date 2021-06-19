<?php
    $con = mysqli_connect('localhost','register','1234','game');
    if (!$con) {
        header("Location: /error.php?error=" . urlencode("<p>Cannot retrieve user info.</p>"));
        die('Could not connect: ' . mysqli_error($con));
    }
    $sql="SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10;";
    $result = mysqli_query($con,$sql);

    echo "<table class=\"scoreboard_table\"><thead class=\"scoreboard_head\">";
    echo "<tr class=\"scoreboard_tr\"><th class=\"scoreboard_th\">gametag</th><th class=\"scoreboard_th\">score</th><th class=\"scoreboard_th\">Date</th></tr></thead>";
    while($row = mysqli_fetch_array($result)) {
        echo "<tr class=\"scoreboard_tr\">";
        echo "<td class=\"scoreboard_td\">" . $row['gametag'] . "</td>";
        echo "<td class=\"scoreboard_td\">" . $row['score'] . "</td>";
        echo "<td class=\"scoreboard_td\">" . $row['date'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    mysqli_close($con);
?>