<?php
define("USE_CUSTOM_ENCRYPTION", false);
    
    
    function redirectToError($message){
        header("Location: ./error.php?error=" . urlencode($message));
    }

    function hashPassword($password){
        if (defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH && USE_CUSTOM_ENCRYPTION) {
            $salt_out = substr(md5(uniqid(rand(), true)), 0, 22);
            $salt = '$2y$11$' . $salt_out;
            $password_encrypted = crypt($password, $salt); 
            return array($password_encrypted, $salt_out);
        }else{
            return  array(password_hash($password, PASSWORD_DEFAULT), "");
        }
    }

    function verifyPassword($password, $salt, $password_remote){
        if(USE_CUSTOM_ENCRYPTION){
            $password_encrypted = crypt($password, '$2y$11$' . $salt);
            return $password_encrypted === $password_remote; 
        }else{
            return password_verify($password, $password_remote);
        }
    }

    function createGametag($gametag){
        return $gametag . "#" . rand(1000,9999);
    }    

?>