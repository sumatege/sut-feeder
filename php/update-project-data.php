<?php

session_start();
require 'config.php';

if($_GET["sdate"] != null && $_GET["edate"] != null && $_GET["bweight"] != null && $_GET["bamount"] != null && $_GET["eweight"] != null){
    $sql = "UPDATE project SET
    p_start_date='" . $_GET["sdate"] . "',
    p_end_date='" . "" . "',
    p_fish_amount='" . $_GET["bamount"] . "',
    p_fish_begin_weight='" . $_GET["bweight"] . "',
    p_fish_end_weight='" . $_GET["eweight"] . "'
    WHERE p_key='" . $_SESSION["selectedKey"] . "'";

    if ($conn->query($sql) === TRUE) {
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}else{
    echo "1";
}

$conn->close();