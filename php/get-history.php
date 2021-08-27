<?php

session_start();
require 'config.php';

$sql = "SELECT * FROM close_project WHERE c_owner='" . $_SESSION["m_id"] . "'";

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
