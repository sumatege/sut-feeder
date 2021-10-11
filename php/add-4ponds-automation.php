<?php

session_start();
require 'config.php';

$conn->set_charset("utf8");

$abovetime = $_GET["abovetime"];
$undertime = $_GET["undertime"];
$feeding_time = $_GET["feeding_time"];
$weight = $_GET["weight"];
$pond = $_GET["pond"];
$array = [];
$val = [];

$sql_select = "SELECT * FROM 4ponds_automation WHERE feeding_time BETWEEN '" . $undertime . "' AND '" . $abovetime . "'";
$result = $conn->query($sql_select);

if ($result->num_rows > 0) {
    echo "1";
    while ($row = $result->fetch_assoc()) {
        array_push($array, $row["feeding_time"]);
    }

    array_push($val, min($array), max($array));
    echo json_encode($val);
} else {
    echo "0";
    $sql_insert = "INSERT INTO 4ponds_automation (equipment_no, equipment_key, feeding_time, food_weight, food_size, food_status, switch, status) 
VALUES ('" . $pond . "', 'qtLpbVhz0H', '" . $feeding_time . "', " . $weight . ", 0, 0, 0, 1)";

    if ($conn->query($sql_insert) === TRUE) {
        echo "0";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
