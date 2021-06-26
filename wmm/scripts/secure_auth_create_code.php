<?php

require_once "libs/GoogleAuthenticator.php";

/**
 * @brief Shows a 2FA recovery code
 * @details This method wraps the showing of the 2FA recovery doe
 * @param string $secret Secret of the 2FA code
 * @param string $name Name of the 2FA code, default Betraum tris
 */
function show_secret(string $secret, string $name = "Betraum tris"){
    $ga = new PHPGangsta_GoogleAuthenticator();
    $qrCodeUrl = $ga->getQRCodeGoogleUrl($name, $secret);

    echo '<img style="width:30%; height:auto" src="' . $qrCodeUrl . '" alt="' . $secret . '">
    <br>
    <p>Recovery code <code>' . $secret . '</code></p>
    <input style="display: none" type="text" value="' . $secret . '"  name="secret">';
}

/**
 * @brief Create 2FA recovery doe
 * @details This method wraps the creation and displaying a 2FA recovery code.
 * @param string $name Name of the code
 * @return string 2FA recovery code
 */
function create_code(string $name = "Betraum tris") : string{
    $ga = new PHPGangsta_GoogleAuthenticator();
    $secret = $ga->createSecret();
    $qrCodeUrl = $ga->getQRCodeGoogleUrl($name, $secret);

    echo '<img style="width:30%; height:auto" src="' . $qrCodeUrl . '" alt="' . $secret . '">
    <br>
    <p>Recovery code <code>' . $secret . '</code></p>
    <input style="display: none" type="text" value="' . $secret . '"  name="secret">';
    return $secret;
}
?>
