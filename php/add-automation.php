<?php

session_start();
require 'config.php';

$conn->set_charset("utf8");

$sql = "INSERT INTO automation (a_project_key, a_feeding_time, a_food_weight, a_round, a_time_per_round, a_break_time, a_switch, a_status) 
VALUES ('" . $_SESSION["selectedKey"] . "',
 '" . $_GET["time"] . "', 
 " . $_GET["total"] . ", 
 " . $_GET["round"] . ", 
 " . $_GET["tpr"] . ", 
 " . $_GET["break"] . ", 
 0,1)";

if ($conn->query($sql) === TRUE) {
    echo $sql;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
