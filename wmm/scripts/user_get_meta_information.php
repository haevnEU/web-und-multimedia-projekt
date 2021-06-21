<?php
    require "database_utils.php";

    session_start();
    if (!isset($_SESSION["user_id"])) {
        header("Location: /error.php?error=" . urlencode("<p>Oooops...</p><p>Access denied to this page, please login.</p>"));
        die("Access denied, please login");
    }

    $database_connection = get_connection_to_game_db();

    $select_player_query = "SELECT * FROM player WHERE USER_ID = ?";
    $statement = $database_connection->prepare($select_player_query);
    $statement->bind_param("s", $_SESSION["user_id"]);
    $statement->execute();
    $result = $statement->get_result();

        while ($row = mysqli_fetch_array($result)) {
?>
<form  method="POST" action="/scripts/user_update_settings.php">
    <fieldset class="groupbox">
        <legend>Personal Information</legend>
        <p class="infotext">Contact the support to change your Personal information</p>
        <p><span style="width: 30%; float:left">Firstname</span> <?php echo $row['first_name'] . " " . $row['surname']; ?> </p>
        <p><span style="width: 30%; float:left">Gametag</span> <?php echo $row['gametag']; ?> </p>
    </fieldset>

    <fieldset class="groupbox">
        <legend>Contact</legend>
        <p class="infotext">Contact the support to change these settings</p>
        <p><span style="width: 30%; float:left">E-Mail</span><?php echo $row['email'];?></p>
        <p><span style="width: 30%; float:left">Mobile</span> <?php echo $row['telephone'];?></p>
    </fieldset>

    <fieldset class="groupbox">
        <legend>Style</legend>
        <p><span style="width: 30%; float:left">Style</span></p>
        <select class="custom_input" name="theme">
            <option selected="selected="> <?php echo $row['style'] ?></option>
            <option>lightmode</option>
            <option>darkmode</option>
            <option>newmode</option>
        </select>
    </fieldset>
    <div class="horizontal_centered">
        <button type="button" class="custom_button custom_button_color"  onclick="location.href='/accounting/changepassword.php'">Change Password</button>
        <button type="submit" class="custom_button custom_button_color">Save</button>
    </div>
</form>
<?php } $database_connection->close(); ?>