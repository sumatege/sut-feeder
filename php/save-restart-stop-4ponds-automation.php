<?php

session_start();
require 'config.php';

$sql = "UPDATE 4ponds SET    
    weather_status = " . $_GET["status"] . ", 
    weather_start_time = " . $_GET["date"];

    if ($conn->query($sql) === TRUE) {
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }

$conn->close();