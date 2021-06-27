<?php
    require "database_utils.php";
    require "utility.php";

    /// Database connection
    $database_connection = get_connection_to_game_db();
    /// Scoreboard select statement
    $sql = "SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10;";
    /// Result of the SQL query
    $result = mysqli_query($database_connection, $sql);
    mysqli_close($database_connection);
?>

<table aria-label="Score board" class="scoreboard_table"><thead class="scoreboard_head">
    <thead>
        <tr class="scoreboard_tr">
            <th id="gametag" class="scoreboard_th"><span aria-label="game tag">gametag</span></th>
            <th id="score" class="scoreboard_th">score</th>
            <th id="rang" class="scoreboard_th">Rang</th>
            <th id="date" class="scoreboard_th">Date</th>

        </tr>
    </thead>
<?php while($row = mysqli_fetch_array($result)) { ?>
    <tr class="scoreboard_tr">

        <td class="scoreboard_td"><?php echo $row['gametag'] ?></td>
        <td class="scoreboard_td"><?php echo $row['score'] ?></td>
        <td class="scoreboard_td"><?php echo scoreToRang($row['score']); ?></td>
        <td class="scoreboard_td"><?php echo $row['date'] ?></td>
    </tr>
<?php } ?>
</table>
