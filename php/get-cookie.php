<?php
session_start();

if(isset($_COOKIE["FailedTxt"])){
    echo $_COOKIE["FailedTxt"];
}else{
    echo "1";
}

?>