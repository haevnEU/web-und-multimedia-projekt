<?php
session_start(); //Nicht vergessen
$name = $_POST['name'];
 
if(!isset($name) OR empty($name)) {
   $name = "Gast";
}
 
//Session registrieren
$_SESSION['username'] = $name;
 
//Text ausgeben
echo "Hallo $name <br />
<a href=\"seite2.php\">Seite 2</a><br />
<a href=\"logout.php\">Logout</a>";
?>