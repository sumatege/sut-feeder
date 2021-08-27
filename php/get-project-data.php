<?php

session_start();
require 'config.php';

if (isset($_SESSION["selectedKey"])) {
    $sql = "SELECT * FROM project WHERE p_key='" . $_SESSION["selectedKey"] . "'";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data = $row;
        }
        echo json_encode($data);
    } else {
        echo "error";
    }
}else{
    echo "1";
}

$conn->close();
