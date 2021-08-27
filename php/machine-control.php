<?php

session_start();
require 'config.php';

$sql = "UPDATE project SET p_machine_status = " . $_GET["status"] . " WHERE p_key ='". $_SESSION["selectedKey"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

?>