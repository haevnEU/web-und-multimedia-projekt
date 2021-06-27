<?php
    require_once "libs/GoogleAuthenticator.php";

    /**
     * @brief Verifies that the provided code is correct
     * @details This method is a wrapper for the used 2FA library
     * @param string $code Code to check
     * @param string $secret Secret code
     * @return bool True if the entered code is valid
     * @since v1.0.0.0
     */
    function check_code(string $code, string $secret) : bool{
        $ga = new PHPGangsta_GoogleAuthenticator();
        return $ga->verifyCode($secret, $code, 8);
    }
?>