<?php

session_start();
require 'config.php';

if ($_GET["equipment_no"] != null && $_GET["feeding_time"] != null && $_GET["food_weight"] != null) {
    $equipment_no = $_GET["equipment_no"];
    $feeding_time = $_GET["feeding_time"];
    $food_weight = $_GET["food_weight"];
    $sql_insert_record = "INSERT INTO 4ponds_record (equipment_no, equipment_key, feeding_time, food_weight) VALUES
('" . $equipment_no . "',
'qtLpbVhz0H',
'" . $feeding_time . "',
'" . $food_weight . "')";
    if ($conn->query($sql_insert_record) === TRUE) {
        $sql_select = "SELECT SUM(food_weight) AS 'total_food' FROM 4ponds_record WHERE equipment_no = '" . $equipment_no . "'";
        $result_select = $conn->query($sql_select);

        $sql_select2 = "SELECT * FROM 4ponds WHERE equipment_no = '" . $equipment_no . "'";
        $result_select2 = $conn->query($sql_select2);

        if ($result_select->num_rows > 0) {
            $row = $result_select->fetch_assoc();
            $sum_food  = $row["total_food"];
            //echo $sum_food;

            $row2 = $result_select2->fetch_assoc();
            //echo $row2["p_fish_end_weight"];

            if ($row2["end_weight"] != 0) {
                $diff = floatval($row2["end_weight"]) - floatval($row2["begin_weight"]);
                //echo $diff;
                $fcr = ($sum_food / 1000) / $diff;
                //echo $fcr;
            } else {
                $fcr = 0;
            }


            $sql_update = "UPDATE 4ponds SET 
            food_used = " . $sum_food . " , 
            fcr = " . $fcr . "
            WHERE equipment_no = '" . $equipment_no . "'";

            if ($conn->query($sql_update) === TRUE) {
                echo "0";
            } else {
                echo "Error updating record: " . $conn->error;
            }
        } else {
            echo "Error seleting.";
        }
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "Error passing value.";
}
