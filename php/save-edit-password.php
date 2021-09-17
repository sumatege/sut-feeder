<?php

session_start();
require 'config.php';


$sql = "UPDATE member SET m_password = '" . $_GET["newpw"] . "' WHERE m_id='" . $_SESSION["m_id"] . "'";

if ($conn->query($sql) === TRUE) {
    $_SESSION["m_password"] = $_GET["newpw"];
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();