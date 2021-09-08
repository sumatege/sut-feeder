<?php

session_start();
require 'config.php';

if ($_GET["sdate"] == null) {
    $sdate = null;
} else {
    $sdate = "'" . $_GET["sdate"] . "'";
}

if ($_GET["edate"] == null) {
    $edate = null;
} else {
    $edate = "'" . $_GET["sdate"] . "'";
}

$sql = "UPDATE project SET
    p_start_date=" . $sdate . ",
    p_end_date=" . $edate . ",
    p_fish_amount='" . $_GET["bamount"] . "',
    p_fish_begin_weight='" . $_GET["bweight"] . "',
    p_fish_end_weight='" . $_GET["eweight"] . "'
    WHERE p_key='" . $_SESSION["selectedKey"] . "'";

echo $sql;
if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
