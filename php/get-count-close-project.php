<?php

session_start();
require 'config.php';

$sql = "SELECT DISTINCT lot FROM 4ponds_close_project";

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
