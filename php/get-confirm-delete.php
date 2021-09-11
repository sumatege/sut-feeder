<?php

session_start();
require 'config.php';

if ($_GET["val"] == $_SESSION["m_phone"] || $_GET["val"] == $_SESSION["m_password"]) {

    $sql = "UPDATE project SET
    p_name = NULL,
    p_owner = NULL,
    p_start_date = NULL,
    p_end_date = NULL,
    p_fish_amount = NULL,
    p_fish_begin_weight = NULL,
    p_fish_end_weight = NULL,
    p_food_unit = NULL,
    p_food_used = NULL,
    p_fcr = NULL,
    p_machine_status = NULL,
    p_latlon = NULL
    WHERE p_key = '" . $_SESSION["selectedKey"] . "'";

    if ($conn->query($sql) === TRUE) {
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }

    
} else {
    echo "1";
}

$conn->close();

?>