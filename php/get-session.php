<?php
session_start();

if($_SESSION["m_id"] != null){
    if($_SESSION["m_id"] == '0'){
        echo "2";
    }else{
        echo "0";
    }
}else{
    echo "1";
}

?>