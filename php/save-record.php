<?php

session_start();
require 'config.php';
$sum_food = 0;

if ($_GET["foodsize"] != null && $_GET["totaltime"] != null && $_GET["usedfood"] != null && $_GET["datetime"] != null) {

    $sqlINSERT = "INSERT INTO record (r_key,r_food_size,r_total_time,r_used_food,r_date_time) VALUES 
    ('" . $_SESSION["selectedKey"] . "'," . $_GET["foodsize"] . ", " . $_GET["totaltime"] . ", " . $_GET["usedfood"] . ",  '" . $_GET["datetime"] . "')";

    if ($conn->query($sqlINSERT) === TRUE) {

        $sql_select = "SELECT SUM(r_used_food) AS 'sum_total_food' FROM record WHERE r_key = '" . $_SESSION["selectedKey"] . "'";
        $result_select = $conn->query($sql_select);

        $sql_select2 = "SELECT * FROM project WHERE p_key = '" . $_SESSION["selectedKey"] . "'";
        $result_select2 = $conn->query($sql_select2);

        if ($result_select->num_rows > 0) {
            $row = $result_select->fetch_assoc();
            $sum_food  = $row["sum_total_food"];
            //echo $sum_food;

            $row2 = $result_select2->fetch_assoc();
            //echo $row2["p_fish_end_weight"];
            $fcr = floatval($row2["p_fish_end_weight"]) / ($sum_food / 1000);
            //echo $fcr;

            $sql_update = "UPDATE project SET 
            p_food_used = " . $sum_food . " , 
            p_fcr = " . $fcr . "
            WHERE p_key = '" . $_SESSION["selectedKey"] . "'";

            if ($conn->query($sql_update) === TRUE) {
                echo "0";
            } else {
                echo "Error updating record: " . $conn->error;
            }
        } else {
            echo "error";
        }
    } else {
        echo "Error updating record: " . $conn->error;
    }
} else {
    echo "1";
}

$conn->close();
