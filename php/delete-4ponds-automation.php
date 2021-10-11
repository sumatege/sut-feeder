<?php

session_start();
require 'config.php';

$sql = "DELETE FROM 4ponds_automation WHERE id=" . $_GET["id"];

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
