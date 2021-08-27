<?php

session_start();
require 'config.php';

if (isset($_GET["lat"]) && isset($_GET["long"])) {
    $lat = $_GET["lat"];
    $long = $_GET["long"];

    $sql = "UPDATE project SET p_latlon='" . $lat . "," . $long . "' WHERE p_key='" . $_SESSION["selectedKey"] . "'";
    
    if ($conn->query($sql) === TRUE) {
        $_SESSION["p_latlong"] = $lat . "," . $long;
        $_SESSION["selectedLatlon"] = $lat . "," . $long;
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "error";
}


$conn->close();
