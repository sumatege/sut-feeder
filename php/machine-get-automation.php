<?php

session_start();
date_default_timezone_set("Asia/Bangkok");
require 'config.php';

$sql = "SELECT * FROM automation WHERE a_project_key='" . $_GET["p_key"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        //$data[] = $row;
        $myObj = new stdClass();
        $myObj->id = $row["a_id"];
        $myObj->a_project_key = $row["a_project_key"];
        $myObj->a_begin_date = $row["a_begin_date"];
        $myObj->a_end_date = $row["a_end_date"];
        $myObj->a_feeding_time = $row["a_feeding_time"];
        $myObj->a_food_weight = $row["a_food_weight"];
        $myObj->a_food_size = $row["a_food_size"];
        $myObj->a_round = $row["a_round"];
        $myObj->a_time_per_round = $row["a_time_per_round"];
        $myObj->a_break_time = $row["a_break_time"];
        $myObj->a_switch = $row["a_switch"];
        $myObj->a_status = $row["a_status"];
        $myObj->current_time = time();
        $data[] = $myObj;
    }
    echo json_encode($data);
} else {
    echo "error";
}

$conn->close();