<?php

session_start();
require 'config.php';
date_default_timezone_set("Asia/Bangkok");

$sql = "SELECT * FROM 4ponds_automation";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        //$data[] = $row;
        $myObj = new stdClass();
        $myObj->id = $row["id"];
        $myObj->equipment_no = $row["equipment_no"];
        $myObj->equipment_key = $row["equipment_key"];
        $myObj->feeding_time = $row["feeding_time"];
        $myObj->food_weight = $row["food_weight"];
        $myObj->food_size = $row["food_size"];
        $myObj->food_status = $row["food_status"];
        $myObj->switch = $row["switch"];
        $myObj->status = $row["status"];
        $myObj->current_time = date("Y-m-d H:i:s");
    }
    echo json_encode($myObj);
} else {
    echo "No data";
}

$conn->close();
