<?php
$database = array(
    "user_name"             => "register",
    "user_password"         => "1234"
    "connection"       => "mysql:host=localhost;dbname=game"
);

    function create_user(){
    }

    function delete_user(){

    }

    function modify_XXX(){

    }


    function does_user_exists($email){

        return true;
    }

    function get_user_password($email){
        global $database;

        $database_connection = new PDO($database["connection"], $database["user_name"], $database["user_password"]);
        $statement = $database_connection->prepare("SELECT pass FROM player WHERE email=?");
        $statement->execute();
        $result = $statement->fetch();

        return $result["pass"];
    }

?>