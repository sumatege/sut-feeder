<?php

session_start();
require 'config.php';

if($_GET["sdate"] != null && $_GET["edate"] != null && $_GET["bweight"] != null && $_GET["bamount"] != null && $_GET["eweight"] != null){
    $sql = "UPDATE project SET
    p_start_date=" . strtotime($_GET["sdate"]) . ",
    p_end_date=" . strtotime($_GET["edate"]) . ",
    p_fish_amount='" . $_GET["bamount"] . "',
    p_fish_begin_weight='" . $_GET["bweight"] . "',
    p_fish_end_weight='" . $_GET["eweight"] . "'
    WHERE p_key='" . $_SESSION["selectedKey"] . "'";

    echo $sql;
    if ($conn->query($sql) === TRUE) {
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}else{
    echo "1";
}

$conn->close();