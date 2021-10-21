<?php

session_start();
require 'config.php';

$sql = "DELETE FROM 4ponds_close_project WHERE lot='" . $_GET["lot"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
