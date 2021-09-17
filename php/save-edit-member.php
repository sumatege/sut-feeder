<?php

session_start();
require 'config.php';


$sql = "UPDATE member SET 
m_name = '" . $_GET["name"] . "',
m_sirname = '" . $_GET["sirname"] . "',
m_phone = '" . $_GET["phone"] . "'
 WHERE m_id='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();