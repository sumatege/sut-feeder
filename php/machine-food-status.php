<?php

$servername = "remotemysql.com";
$username = "YOVzbEn8XW";
$password = "VBA5JgCdGV";
$db = "YOVzbEn8XW";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE project SET p_food_status = " . $_GET["p_food_status"] . " WHERE p_key='" . $_GET["p_key"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
