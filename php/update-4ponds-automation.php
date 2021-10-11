<?php

session_start();
require 'config.php';

$sql = "UPDATE 4ponds_automation
SET switch = " . $_GET["switch"] . " 
WHERE id=" . $_GET["id"];

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
