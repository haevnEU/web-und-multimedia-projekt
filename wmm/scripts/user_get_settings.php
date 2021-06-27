<?php
    require "database_utils.php";
    require "utility.php";
    session_start();
    if (!isset($_SESSION["user_id"])) {
        print_error("Authentication Error", "Access denied", "<p>Ooooops... you are not logged in");
        die;
    }

    /// Connection to the database
    $database_connection = get_connection_to_game_db();
    /// SQL Select code which is used to retrieve user information from the database
    $select_player_query = "SELECT * FROM player WHERE USER_ID = ?";
    /// Prepared SQL statement
    $statement = $database_connection->prepare($select_player_query);
    $statement->bind_param("s", $_SESSION["user_id"]);
    $statement->execute();
    /// Result of the SQL query
    $result = $statement->get_result();

    /// Possible styles, in a future release they should be read in from the styles directory
    $styles = array('darkmode','lightmode','newmode','colorblindmode');
        while ($row = mysqli_fetch_array($result)) {
            $name = $row['first_name'] . " " . $row['surname'];
            $score = $row['score'];
?>
     <fieldset class="groupbox">
        <legend>Personal Information</legend>
         <p class="infotext">Contact the support to change your Personal information</p>
         <p><span style="width: 30%; float:left">Name</span> <?php echo $name; ?></p>
         <p><span style="width: 30%; float:left">Gametag</span> <?php echo $row['gametag']; ?></p>
     </fieldset>

     <fieldset class="groupbox">
         <legend>Statistic</legend>
         <p><span style="width: 30%; float:left">Score</span> <?php echo $score; ?> </p>
         <p><span style="width: 30%; float:left">Rang</span> <?php echo scoreToRang($score); ?> </p>
     </fieldset>

    <fieldset class="groupbox">
        <legend>Contact</legend>
        <p class="infotext">Contact the support to change these settings</p>
        <p><span style="width: 30%; float:left">E-Mail</span><?php echo $row['email'];?></p>
        <p><span style="width: 30%; float:left">Mobile</span> <?php echo $row['telephone'];?></p>
    </fieldset>
    <fieldset class="groupbox">
        <legend>Style</legend>
        <form  method="POST" action="/scripts/user_change_theme.php">
            <p><span style="width: 30%; float:left">Theme</span></p>
            <label>
                <select class="custom_input" name="theme"  onchange="this.form.submit()">
                    <?php foreach($styles as $style){
                        $selection = ($style == $row['style']) ? "selected=\"selected\"" : "";
                        echo "<option value=\"" . $style . "\" " . $selection . " >" . $style . "</option>";
                    }?>
                </select>
            </label>
        </form>
        </fieldset>
            <fieldset class="groupbox">
                <legend>Contact</legend>
                <p class="infotext">Contact the support to request the full 2FA code</p>
                <p><span style="width: 30%; float:left">Recovery code</span><?php echo "*************" . substr($row['secret'],13);?></p>
                <button type="button" class="custom_button custom_button_color"  onclick="location.href='/accounting/changepassword.php'">Change Password</button>
            </fieldset>

<?php } $database_connection->close(); ?>