<?php

session_start();
require 'config.php';

$sql = "SELECT * FROM project WHERE p_key='" . $_GET["key"] . "'";

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
