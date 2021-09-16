<?php

session_start();
require 'config.php';


$sql = "INSERT INTO project (p_key,p_status) VALUES ('" . $_GET["key"] . "','0')";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
