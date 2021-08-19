<?php
session_start();

if($_SESSION["m_id"] !== null){
    echo "0";
}else{
    echo "1";
}

?>