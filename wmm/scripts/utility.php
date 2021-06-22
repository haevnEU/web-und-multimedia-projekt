<?php

    /**
     * This method hashes a password using php internal password_hash method
     * @param string $password Plain password
     * @return string hashed password
     */
    function hashPassword(string $password) : string{
        return password_hash($password, PASSWORD_DEFAULT);
    }

    /**
     * This method uses the php internal password_verify method
     * to ensure that the entered password matches the account password
     * @param string $password Entered password
     * @param string $password_remote Account password
     * @return bool True iff booth matches
     */
    function verifyPassword(string $password, string $password_remote) : bool{
       return password_verify($password, $password_remote);
    }

/*
 * This code is used to illustrate how a custom encryption/decryption of a password can be achieved
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

    /**
     * This method appends a random number between 1000 and 9999 on the gametag
     * @param string $gametag Users raw gametag
     * @return string Number appended gametag
     */
    function createGametag(string $gametag) : string{
        return $gametag . "#" . rand(1000, 9999);
    }

    /**
     * This method redirects to a error page
     * @param string $header Header of the error, typical a generic description
     * @param string $subheader Subheader of the error, typical a bite preciser description
     * @param string $message Message which is associated with the error
     */
    function print_error(string $header, string $subheader, string $message){
        header("Location: /error.php?header=" . urlencode($header) . "&subheader=" . urlencode($subheader) . "&error=" . urlencode("<div>". $message . "</div>"));
    }

?>