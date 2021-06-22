<?php
session_start();
$page = "";

$uid = $_SESSION["user_id"];
if(isset($_SESSION["user_id"])){

  $database_server_name = "localhost";
            $database_user_name = "register";
            $database_user_password = "1234";
            $database_table_name = "game";

    $connection = new mysqli($database_server_name, $database_user_name, $database_user_password, $database_table_name);
            if ($connection->connect_error) {
                return false;
            }
$friend_list = "TEST";
            $sql = "SELECT FRIEND_ID FROM friendlist WHERE USER_ID='$uid';";
            echo $sql;
            $result = $connection->query($sql);
            if($result->num_rows >= 1){
                $row = $result->fetch_assoc();
                $friend_list = $row['FRIEND_ID'];
            }else{

                return false;
            }

            $connection->close();





$page =  "<div class=\"chat chat-popup\" id=\"myForm\"><h2>Social</h2>
            <p>$friend_list</p>
            <form action=\"/action_page.php\" class=\"form-container\">
                <h1>Chat</h1>

                <label for=\"msg\"><b>Message</b></label>
                <textarea placeholder=\"Type message..\" name=\"msg\" required></textarea>

            <script src=\"./social.js\"></script>
                <button type=\"submit\" class=\"btn\">Send</button>
            </form>
        </div>
        <button type=\"button\" class=\"btn cancel\" onclick=\"toggleForm()\">Toggle</button>
        ";

}else{
  //  header('Location: ../accounting/login.php');
  $page = "$uid";
}
print $page;
?>