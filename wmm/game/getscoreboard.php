<?php

    $con = mysqli_connect('localhost','register','1234','game');
    if (!$con) {
        header("Location: /error.php?error=" . urlencode("<p>Cannot retrieve user info.</p>"));
        die('Could not connect: ' . mysqli_error($con));
    }
    $sql="SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10;";
    $result = mysqli_query($con,$sql);

    echo "<table><thead><tr><th>gametag</th><th>score</th><th>Date</th></tr></thead>";
    while($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['gametag'] . "</td>";
        echo "<td>" . $row['score'] . "</td>";
        echo "<td>" . $row['date'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    mysqli_close($con);
?>