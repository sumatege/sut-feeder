<?php

session_start();
require 'config.php';

$sql = "UPDATE project SET  
p_name = '" . $_GET["name"] . "',
p_owner = " . $_GET["owner"] . ",
p_start_date = '" . $_GET["sdate"] . "',
p_end_date = '" . $_GET["edate"] . "',
p_fish_amount = " . $_GET["amount"] . ",
p_fish_begin_weight = " . $_GET["bweight"] . ",
p_fish_end_weight =" . $_GET["eweight"] . ",
p_food_used = " . $_GET["food"] . ",
p_fcr = " . $_GET["fcr"] . ",
p_status = " . $_GET["status"] . " 
 WHERE p_id='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();