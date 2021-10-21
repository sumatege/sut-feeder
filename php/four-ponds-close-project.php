<?php

session_start();
require 'config.php';
date_default_timezone_set("Asia/Bangkok");

$sql_close_data = "SELECT MAX(lot) AS 'lot' FROM 4ponds_close_project";
$result_close_data = $conn->query($sql_close_data);

if ($result_close_data->num_rows > 0) {
    $row_close_data = $result_close_data->fetch_assoc();
    if ($row_close_data["lot"] == null) {
        $lot = "100001";
    } else {
        $lot = $row_close_data["lot"] + 1;
    }
} else {
    echo "1";
}

$sql_project_data = "SELECT * FROM 4ponds";

$result_project_data = $conn->query($sql_project_data);

if ($result_project_data->num_rows > 0) {
    while ($row_project_data = $result_project_data->fetch_assoc()) {
        if($row_project_data["start_date"] == null){
            $sdate = "null";
        }else{
            $sdate = "'" . $row_project_data["start_date"] . "'";
        }
        $sql_insert = "INSERT INTO 4ponds_close_project (lot, equipment_key, equipment_no, start_date, end_date, fish_amount, begin_weight, end_weight, food_used, fcr, latlon) VALUES
        ('" . $lot . "', 'qtLpbVhz0H', '" . $row_project_data["equipment_no"] . "', " . $sdate . ", '" . date("Y-m-d") . "', '" . $row_project_data["fish_amount"] . "', '" . $row_project_data["begin_weight"] . "','" . $row_project_data["end_weight"] . "', '" . $row_project_data["food_used"] . "', '" . $row_project_data["fcr"] . "', '" . $row_project_data["latlon"] . "')";

        if ($conn->query($sql_insert) === TRUE) {
            echo "0";
            //echo "Insert No: " . $row_project_data["equipment_no"] . " successful.";
        } else {
            echo "Error insert No: " . $row_project_data["equipment_no"] . " " . $conn->error . "<br/>";
            echo $sql_insert . "<br/>";
        }
    }
} else {
    echo "1";
}

$conn->close();
