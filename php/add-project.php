<?php

session_start();
require 'config.php';

if($_GET["key"] != null && $_GET["name"] != null && $_GET["weight"] != null && $_GET["amount"] != null){
    $sql = "UPDATE project SET
    p_name='" . $_GET["name"] . "',
    p_owner='" . $_SESSION["m_id"] . "',
    p_start_date='" . date("Y/m/d") . "',
    p_fish_amount='" . $_GET["amount"] . "',
    p_fish_begin_weight='" . $_GET["weight"] . "',
    p_fish_end_weight = 0,
    p_food_size = 0,
    p_food_used = 0,
    p_fcr = 0,
    p_machine_status = 1,
    p_weather_status = 1
    WHERE p_key='" . $_GET["key"] . "'";

    if ($conn->query($sql) === TRUE) {
        $_SESSION["selectedKey"] = $_GET["key"];
        $_SESSION["selectedName"] = $_GET["name"];

        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}else{
    echo "1";
}

$conn->close();