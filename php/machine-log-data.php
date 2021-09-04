<?php

require 'config.php';

$sql = "INSERT INTO log_data (p_key,food_status,sollar_cell_voltage,battery_voltage,mcu_temp) VALUES
('" . $_GET["p_key"] . "'," . $_GET["food_status"] . "," . $_GET["sollar_cell_voltage"] . "," . $_GET["battery_voltage"] . "," . $_GET["mcu_temp"] . ")";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
