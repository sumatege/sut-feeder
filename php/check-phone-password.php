<?php

session_start();
require 'config.php';


$sql = "SELECT * FROM member WHERE m_id='" . $_SESSION["m_id"] . "' AND m_phone = '" . $_GET["auth"] . "' OR m_password = '" . $_GET["auth"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data = $row;
    }
    //echo json_encode($data);
    echo "0";
} else {
    echo "1";
}

$conn->close();
