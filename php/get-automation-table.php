<?php

session_start();
require 'config.php';

if (isset($_SESSION["selectedKey"])) {
    $sql = "SELECT * FROM automation WHERE a_project_key='" . $_SESSION["selectedKey"] . "' ORDER BY a_feeding_time ASC";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        echo "1";
    }
} else {
    echo "1";
}


$conn->close();
