<?php
    session_start();
    if(!isset($_SESSION["user_id"])){
        header("Location: /error.php?error=" . urlencode("<p>Oooops...</p><p>Access denied to this page, please login.</p>"));
        die("Access denied, please login");
    }
    $con = mysqli_connect('localhost','register','1234','game');
    if (!$con) {
        header("Location: /error.php?error=" . urlencode("<p>Cannot retrieve user info.</p>"));
        die('Could not connect: ' . mysqli_error($con));
    }
    $sql="SELECT * FROM player WHERE USER_ID = '" . $_SESSION["user_id"] . "'";
    $result = mysqli_query($con,$sql);

    if(isset($_GET['json'])){
            while($row = mysqli_fetch_array($result)) {
                echo "{\"Firstname\":\"" . $row['first_name'] . "\",";
                echo  "\"Surname\":\"" . $row['surname'] . "\",";
                echo  "\"Gametag\":\"" . $row['gametag'] . "\",";
                echo  "\"EMail\":\"" . $row['email'] . "\",";
                echo  "\"State\":\"" . $row['state'] . "\",";
                echo  "\"Motto\":\"" . $row['motto'] . "\",";
                echo  "\"Score\":\"" . $row['score'] . "\"}";
            }
    }else{
        echo "<table></thead>";
        while($row = mysqli_fetch_array($result)) {
            echo "<tr>";
            echo "<td>Firstname</td><td>" . $row['first_name'] . "</td>";
            echo "<tr>";
            echo "</tr>";
            echo "<td>Surname</td><td>" . $row['surname'] . "</td>";
            echo "<tr>";
            echo "</tr>";
            echo "<td>Gametag</td><td>" . $row['gametag'] . "</td>";
            echo "<tr>";
            echo "</tr>";
            echo "<td>EMail</td><td>" . $row['email'] . "</td>";
            echo "<tr>";
            echo "</tr>";
            echo "<td>State</td><td>" . $row['state'] . "</td>";
            echo "<tr>";
            echo "</tr>";
            echo "<td>Motto</td><td>" . $row['motto'] . "</td>";
            echo "<tr>";
            echo "</tr>";
           echo "<tr>";
            echo "<td>Score</td><td>" . $row['score'] . "</td>";
            echo "</tr>";
        }
        echo "</table>";
    }
    mysqli_close($con);
?>