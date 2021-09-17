<?php

session_start();
require 'config.php';


$sql = "UPDATE member SET 
m_name = '" . $_GET["name"] . "',
m_sirname = '" . $_GET["sirname"] . "',
m_phone = '" . $_GET["phone"] . "' 
 WHERE m_id='" . $_SESSION["m_id"] . "'";

if ($conn->query($sql) === TRUE) {
    $_SESSION["m_name"] = $_GET["name"];
    $_SESSION["m_sirname"] = $_GET["sirname"];
    $_SESSION["m_phone"] = $_GET["phone"];
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();