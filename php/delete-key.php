<?php

session_start();
require 'config.php';

$sql = "DELETE FROM project WHERE p_key='" . $_GET["key"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
