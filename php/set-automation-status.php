<?php

session_start();
require 'config.php';

if ($_GET["status"] == 0) {
    $sql_select = "SELECT * FROM automation  WHERE a_id='" . $_GET["id"] . "'";
    $result_select = $conn->query($sql_select);

    if ($result_select->num_rows > 0) {
        $row = $result_select->fetch_assoc();
        if ($row["a_status"] == 1) {

            //INSERT RECORD
            $totaltime = intval($row["a_round"]) * intval($row["a_time_per_round"]);
            $usedfood = floatval($row["a_food_weight"]) * 1000;
            $sql_insert = "INSERT INTO record (r_key,r_food_size,r_total_time,r_used_food,r_date_time) VALUES 
            ('" . $row["a_project_key"] . "'," . $row["a_food_size"] . ", " . $totaltime . ", " . $usedfood . ",  '" . $_GET["datetime"] . "')";

            if ($conn->query($sql_insert) === FALSE) {
                echo "Error inserting record: " . $conn->error;
            }

            //UPDATE PROJECT
            $sql_select2 = "SELECT * FROM project WHERE p_key = '" . $_GET["key"] . "'";
            $result_select2 = $conn->query($sql_select2);

            if ($result_select2->num_rows > 0) {
                $row2 = $result_select2->fetch_assoc();
                $p_foodused  = floatval($row2["p_food_used"]) + $usedfood;

                if ($row2["p_fish_end_weight"] != 0) {
                    $diff = floatval($row2["p_fish_end_weight"]) - floatval($row2["p_fish_begin_weight"]);
                    //echo $diff;
                    $fcr = ($p_foodused / 1000) / $diff;
                    //echo $fcr;
                } else {
                    $fcr = 0;
                }           

                $sql_update_2 = "UPDATE project SET 
            p_food_used = " . $p_foodused . " , 
            p_fcr = " . $fcr . " 
            WHERE p_key = '" . $_GET["key"] . "'";

                echo $sql_select2 . " " . $p_foodused . " " . $fcr . " " . $sql_update_2;

                if ($conn->query($sql_update_2) === FALSE) {
                    echo "Error updating record: " . $conn->error;
                }
            } else {
                echo "error";
            }
        }
    } else {
        echo "error";
    }
}

$sql = "UPDATE automation SET a_status = " . $_GET["status"] . " WHERE a_id='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
