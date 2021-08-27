<?php

session_start();
require 'config.php';

$sql = "DELETE FROM automation WHERE a_id=" . $_GET["id"];

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
