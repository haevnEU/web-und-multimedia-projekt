<?php
$empfaenger = "empfaenger@domain.de";
$betreff = "Die Mail-Funktion";
$from = "From: Vorname Nachname <absender@domain.de>";
$text = "Hier lernt Ihr, wie man mit PHP Mails verschickt";

$result = mail($empfaenger, $betreff, $text, $from);
    echo $result ? "TRUE" : "FALSE";
?>