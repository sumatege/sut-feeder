<?php

session_start();
require 'config.php';

$sql = "UPDATE project SET
    p_food_unit = '" . $_GET["unit"] . "' 
     WHERE p_key='" . $_SESSION["selectedKey"] . "'";
echo $sql;
if ($conn->query($sql) === TRUE) {
    $_SESSION["selectedUnit"] = $_GET["unit"];
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
