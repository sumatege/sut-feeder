<?php

session_start();
require 'config.php';

$sql = "SELECT * FROM project WHERE p_key='" . $_SESSION["selectedKey"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data = $row;

        $_SESSION["selectedId"] = $row["p_id"];
        $_SESSION["selectedKey"] = $row["p_key"];
        $_SESSION["selectedName"] = $row["p_name"];
        $_SESSION["selectedLatlon"] = $row["p_latlon"];
    }
    echo json_encode($data);
} else {
    echo "error";
}

$conn->close();