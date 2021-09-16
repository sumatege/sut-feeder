<?php

session_start();
require 'config.php';
$txt = "";

$sql = "SELECT a.*, b.* FROM project AS a LEFT JOIN member AS b ON a.p_owner = b.m_id";

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
