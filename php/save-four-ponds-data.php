<?php

session_start();
require 'config.php';

$sql = "UPDATE 4ponds SET  
start_date = '" . $_GET["sdate"] . "',
end_date = '" . $_GET["edate"] . "',
fish_amount = '" . $_GET["amount"] . "',
begin_weight = '" . $_GET["bweight"] . "',
end_weight = '" . $_GET["eweight"] . "'
 WHERE equipment_no ='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();