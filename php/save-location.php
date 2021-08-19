<?php

session_start();
require 'config.php';

if (isset($_GET["lat"]) && isset($_GET["long"])) {
    $lat = $_GET["lat"];
    $long = $_GET["long"];

    $sql = "UPDATE member SET m_latlong='" . $lat . "," . $long . "' WHERE m_id=" . $_SESSION["m_id"];
    if ($conn->query($sql) === TRUE) {
        $_SESSION["m_latlong"] = $lat . "," . $long;
        echo "0";
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "error";
}


$conn->close();
