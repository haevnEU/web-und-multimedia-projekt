<?php

    /**
     * @brief Converts a plain password into a secure one
     * @details The conversion is done via the php internal password_hash method.
     * @param string $password Plain password
     * @return string hashed password
     * @since v1.0.0.0
     */
    function hashPassword(string $password) : string{
        return password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * @brief Verifies that two passwords are equal
     * @details The verification is done using the php internal password_verify method
     * @param string $password Entered password
     * @param string $password_remote Account password
     * @return bool True iff booth matches
     * @since v1.0.0.0
     */
    function verifyPassword(string $password, string $password_remote) : bool{
       return password_verify($password, $password_remote);
    }

    /**
     * @brief Create a gametag
     * @details This method requires a string where a random number is appended.
     * @param string $gametag Desired plain gametag
     * @return string Full unique gametag
     * @since v1.0.0.0
     */
    function createGametag(string $gametag) : string{
        return $gametag . "#" . rand(1000, 9999);
    }

    /**
     * @brief Redirection to the error page
     * @details This wrapper method redirects to the error page. An header, subheader and a message are transmitted to
     * the error page.
     * @param string $header Header of the error, typical a generic description
     * @param string $subheader Subheader of the error, typical a bite preciser description
     * @param string $message Message which is associated with the error
     * @since v1.0.0.0
     */
    function print_error(string $header, string $subheader, string $message){
        header("Location: /error.php?header=" . urlencode($header) . "&subheader=" . urlencode($subheader) . "&error=" . urlencode("<div>". $message . "</div>"));
    }

    /**
     * @brief Converts a score value to a rang
     * @details This method takes a score and maps it to a rang
     * @param int $score Score to be mapped
     * @return string Rangname
     * @since v1.0.0.0
     */
    function scoreToRang(int $score) : string{
        $rang = "Noob";
        if($score > 1000000){
            $rang = "Elite";
        }else if($score > 100000){
            $rang = "Master"; 
        }else if($score > 10000){
            $rang = "Average"; 
        }

        return $rang;
    }


/*
 * Well dead code should never be placed in production but this dead code is used to illustrate how a password is created
 * for remote storage if the php internal method are not used.
 *
 * function hashPassword(string $password){
 *   $salt_out = substr(md5(uniqid(rand(), true)), 0, 22);
 *   $salt = '$2y$11$' . $salt_out;
 *   $password_encrypted = crypt($password, $salt);
 *    return array($password_encrypted, $salt_out);
 *}
 *
 * function verifyPassword(string $password, string $salt, string $password_remote) : bool{
 *       $password_encrypted = crypt($password, '$2y$11$' . $salt);
 *       return $password_encrypted === $password_remote;
 *}
 */

?>