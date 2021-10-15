<?php

session_start();
require 'config.php';

$sql = "SELECT * FROM 4ponds LIMIT 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data = $row;
        $latlon = explode(",", $row["latlon"]);
        $_SESSION["p_latlong"] = $latlon[0] . "," . $latlon[1];
        $_SESSION["selectedLatlon"] = $latlon[0] . "," . $latlon[1];
    }
    echo json_encode($data);
} else {
    echo "1";
}

$conn->close();