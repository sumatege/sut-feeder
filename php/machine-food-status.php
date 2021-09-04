<?php

require 'config.php';

$sql = "UPDATE project SET p_food_status = " . $_GET["p_food_status"] . " WHERE p_key='" . $_GET["p_key"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
