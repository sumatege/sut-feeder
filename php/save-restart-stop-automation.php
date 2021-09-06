<?php

session_start();
require 'config.php';

$sql = "UPDATE project SET    
    p_weather_status = " . $_GET["status"] . ", 
    p_weather_start_time = '" . $_GET["date"] . "' 
    WHERE p_key='" . $_SESSION["selectedKey"] . "'";

    if ($conn->query($sql) === TRUE) {
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }

$conn->close();