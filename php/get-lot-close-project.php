<?php

session_start();
require 'config.php';

$sql = "SELECT * FROM 4ponds_close_project WHERE lot = '" . $_GET["lot"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "1";
}

$conn->close();
