<?php

session_start();
require 'config.php';
$sum_food = 0;
$fcr = 0;

$sql_select = "SELECT SUM(r_used_food) AS 'sum_total_food' FROM record WHERE r_key = '" . $_SESSION["selectedKey"] . "'";
$result_select = $conn->query($sql_select);

$sql_select2 = "SELECT * FROM project WHERE p_key = '" . $_SESSION["selectedKey"] . "'";
$result_select2 = $conn->query($sql_select2);

if ($result_select->num_rows > 0) {
    $row = $result_select->fetch_assoc();
    $sum_food  = $row["sum_total_food"];

    $row2 = $result_select2->fetch_assoc();
    $fcr = floatval($row2["p_fish_end_weight"]) / ($sum_food / 1000);

    $sql_update = "UPDATE project SET 
            p_food_used = " . $sum_food . " , 
            p_fcr = " . $fcr . "
            WHERE p_key = '" . $_SESSION["selectedKey"] . "'";

    if ($conn->query($sql_update) === TRUE) {
        echo "<br/>0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
}
