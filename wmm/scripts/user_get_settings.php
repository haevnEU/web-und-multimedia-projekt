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
    $styles = array('darkmode','lightmode','newmode','colorblindmode');
        while ($row = mysqli_fetch_array($result)) {
?>
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
        <form  method="POST" action="/scripts/user_change_theme.php">
            <legend>Style</legend>
            <p><span style="width: 30%; float:left">Style</span></p>
            <select class="custom_input" name="theme"  onchange="this.form.submit()">
                <?php foreach($styles as $style){
                    $selection = ($style == $row['style']) ? "selected=\"selected\"" : "";
                    echo "<option value=\"" . $style . "\"" . $selection . ">" . $style . "</option>";
                }?>
            </select>
            </form>
        </fieldset>
    <div class="horizontal_centered">
        <button type="button" class="custom_button custom_button_color"  onclick="location.href='/accounting/changepassword.php'">Change Password</button>
    </div>
<?php } $database_connection->close(); ?>