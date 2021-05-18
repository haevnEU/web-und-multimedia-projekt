<?php

// TODO
function generateHash($password) {
    if (defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH && false) {
        $salt = '$2y$11$' . substr(md5(uniqid(rand(), true)), 0, 22);
        $password_encrypted = crypt($password, $salt); 
        return array($password_encrypted, $salt);
    }else{
        return  password_hash($password, PASSWORD_DEFAULT);
    }
}


function redirectToError($message){
    //    PRODUCTION HEADER
    //    header("Location: http://localhost/account/error.php?error=" . urlencode($message));
    
    //  TEST HEADER
        header("Location: http://localhost/scratch/accounting/error.php?error=" . urlencode($message));
}

?>