<?php

require_once "libs/GoogleAuthenticator.php";

function show_secret(string $secret, string $name = "Betraum tris"){
    $ga = new PHPGangsta_GoogleAuthenticator();
    $qrCodeUrl = $ga->getQRCodeGoogleUrl($name, $secret);


    echo '<img style="width:30%; height:auto" src="' . $qrCodeUrl . '" alt="' . $secret . '">
    <br>
    <p>Recovery code <code>' . $secret . '</code></p>
    <input style="display: none" type="text" value="' . $secret . '"  name="secret">';

}

function create_code(string $name = "Betraum tris") : string{

    $ga = new PHPGangsta_GoogleAuthenticator();
    $secret = $ga->createSecret();
    $qrCodeUrl = $ga->getQRCodeGoogleUrl($$name, $secret);


    echo '<img style="width:30%; height:auto" src="' . $qrCodeUrl . '" alt="' . $secret . '">
    <br>
    <p>Recovery code <code>' . $secret . '</code></p>
    <input style="display: none" type="text" value="' . $secret . '"  name="secret">';
    return $secret;
}
?>
