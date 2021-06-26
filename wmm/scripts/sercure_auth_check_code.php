<?php
    require_once "libs/GoogleAuthenticator.php";

    /**
     * This method verifies if the entered 2FA code is valid
     * @param string $code Code to check
     * @param string $secret Secret code
     * @return bool True if the entered code is valid
     */
    function check_code(string $code, string $secret) : bool{
        $ga = new PHPGangsta_GoogleAuthenticator();
        echo $code . " " . $secret;
        return $ga->verifyCode($secret, $code, 8);
    }
?>