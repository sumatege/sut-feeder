<?php

session_start();
require 'config.php';

$sql = "UPDATE automation
SET a_switch = " . $_GET["switch"] . " 
WHERE a_id=" . $_GET["id"];

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
