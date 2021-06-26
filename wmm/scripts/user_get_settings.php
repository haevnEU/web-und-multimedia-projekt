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
            $name = $row['first_name'] . " " . $row['surname'];
?>
    <fieldset class="groupbox">
        <legend aria-label="Your personal Information">Personal Information</legend>
        <p aria-label="Contact the support to change your Personal information" class="infotext">Contact the support to change your Personal information</p>
        <p aria-label="Your Name is <?php echo $name; ?>"><span aria-hidden="true" style="width: 30%; float:left">Name</span> <?php echo $name; ?> </p>
        <p aria-label="Your game tag is <?php echo $row['gametag']; ?> "><span style="width: 30%; float:left">Gametag</span> <?php echo $row['gametag']; ?> </p>
    </fieldset>

    <fieldset class="groupbox">
        <legend aria-label="YOur contact information">Contact</legend>
        <p aria-label="Contact the support to change these settings" class="infotext">Contact the support to change these settings</p>
        <p aria-label="Your e-mail is <?php echo $row['email'];?>"><span style="width: 30%; float:left">E-Mail</span><?php echo $row['email'];?></p>
        <p aria-label="Your registered telephone i <?php echo $row['telephone'];?>"><span style="width: 30%; float:left">Mobile</span> <?php echo $row['telephone'];?></p>
    </fieldset>
    <fieldset class="groupbox">
        <legend>Style</legend>

        <form  method="POST" action="/scripts/user_change_theme.php">
            <p><span style="width: 30%; float:left">Theme</span></p>
            <select class="custom_input" name="theme"  onchange="this.form.submit()">
                <?php foreach($styles as $style){
                    $selection = ($style == $row['style']) ? "selected=\"selected\"" : "";
                    echo "<option value=\"" . $style . "\"" . $selection . ">" . $style . "</option>";
                }?>
            </select>
            </form>
        </fieldset>
            <fieldset class="groupbox">
                <legend>Contact</legend>
                <p class="infotext">Contact the support to request the full 2FA code</p>
                <p><span style="width: 30%; float:left">Recovery code</span><?php echo "*************" . substr($row['secret'],13);?></p>
                <button type="button" class="custom_button custom_button_color"  onclick="location.href='/accounting/changepassword.php'">Change Password</button>
            </fieldset>

<?php } $database_connection->close(); ?>