<?php

date_default_timezone_set('Asia/Bangkok');
$newTime = date("Y-m-d H:i:s", strtotime(date("Y-m-d H:i:s") . " +7 hours"));
require 'config.php';

$sql = "INSERT INTO log_data (p_key,food_status,sollar_cell_voltage,battery_voltage,mcu_temp,timestamp) VALUES
('" . $_GET["p_key"] . "'," . $_GET["food_status"] . "," . $_GET["sollar_cell_voltage"] . "," . $_GET["battery_voltage"] . "," . $_GET["mcu_temp"] . ",'" . date("Y-m-d h:i:s") . "')";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
