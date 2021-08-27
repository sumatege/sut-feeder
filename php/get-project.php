<?php

session_start();
require 'config.php';
$txt = "";

$sql = "SELECT * FROM project WHERE p_key='" . $_GET["key"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if($row["p_owner"] == NULL){
            $txt = "0";
        }else{
            $txt = "2";
        }
    }
} else {
    $txt = "1";
}

echo $txt;

$conn->close();