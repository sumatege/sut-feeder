<?php

session_start();
require 'config.php';

$sql_select = "SELECT * FROM project WHERE p_key='" . $_SESSION["selectedKey"] . "'";
$result = $conn->query($sql_select);
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data = $row;
    }
    //echo json_encode($data);

    $sql_insert = "INSERT INTO close_project (c_key,c_name,c_owner,c_start_date,c_end_date,c_fish_amount,c_fish_begin_weight,c_fish_end_weight,c_food_size,c_food_used,c_fcr,c_latlon) VALUES
('" . $data["p_key"] . "',
'" . $data["p_name"] . "',
'" . $data["p_owner"] . "',
'" . $data["p_start_date"] . "',
'" . $data["p_end_date"] . "',
'" . $data["p_fish_amount"] . "',
'" . $data["p_fish_begin_weight"] . "',
'" . $data["p_fish_end_weight"] . "',
'" . $data["p_food_size"] . "',
'" . $data["p_food_used"] . "',
'" . $data["p_fcr"] . "',
'" . $data["p_latlon"] . "')";


    if ($conn->query($sql_insert) === TRUE) {
        $sql = "UPDATE project SET
    p_name = NULL,
    p_owner = NULL,
    p_start_date = NULL,
    p_end_date = NULL,
    p_fish_amount = NULL,
    p_fish_begin_weight = NULL,
    p_fish_end_weight = NULL,
    p_food_size = NULL,
    p_food_used = NULL,
    p_fcr = NULL,
    p_machine_status = NULL,
    p_latlon = NULL
    WHERE p_key = '" . $_SESSION["selectedKey"] . "'";

        if ($conn->query($sql) === TRUE) {
            echo "0";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "error";
}

$conn->close();
