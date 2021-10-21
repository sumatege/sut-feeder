<?php

session_start();
require 'config.php';

$sql_record = "TRUNCATE TABLE 4ponds_record";

if ($conn->query($sql_record) === TRUE) {

    $sql_data = "UPDATE 4ponds SET
start_date = null,
end_date = null,
fish_amount = 0,
begin_weight = 0,
end_weight = 0,
food_used = 0,
fcr = 0,
weather_status = 1,
weather_start_time = null";

    if ($conn->query($sql_data) === TRUE) {
        $sql_automation = "TRUNCATE TABLE 4ponds_automation";

        if ($conn->query($sql_automation) === TRUE) {
            echo "0";
        } else {
            echo "Error deleting automation: " . $conn->error;
        }
    } else {
        echo "Error updating data: " . $conn->error;
    }
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
