<?php
// TODO
    require "database_utils.php";
    $database_connection = get_connection_to_game_db();

    $sql="SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10;";
    $result = mysqli_query($database_connection, $sql);
    mysqli_close($database_connection);
?>

<table class="scoreboard_table"><thead class="scoreboard_head">
    <thead>
        <tr class="scoreboard_tr">
            <th class="scoreboard_th">gametag</th>
            <th class="scoreboard_th">score</th>
            <th class="scoreboard_th">Date</th>
        </tr>
    </thead>
<?php
    while($row = mysqli_fetch_array($result)) {
    ?>
    <tr class="scoreboard_tr">
        <td class="scoreboard_td"><?php echo $row['gametag'] ?></td>
        <td class="scoreboard_td"><?php echo $row['score'] ?></td>
        <td class="scoreboard_td"><?php echo $row['date'] ?></td>
    </tr>
<?php } ?>
    </table>
