<?php

session_start();
require 'config.php';

if ($_GET["sdate"] == "null") {
    $sdate = null;
} else {
    $sdate = "'" . $_GET["sdate"] . "'";
}

if ($_GET["edate"] == "null") {
    $edate = null;
} else {
    $edate = "'" . $_GET["edate"] . "'";
}

if ($_GET["bamount"] == "null") {
    $bamount = 0;
} else {
    $bamount = $_GET["bamount"];
}

if ($_GET["bweight"] == "null") {
    $bweight = 0;
} else {
    $bweight = $_GET["bweight"];
}

if ($_GET["eweight"] == "null") {
    $eweight = 0;
} else {
    $eweight = $_GET["eweight"];
}

$sql = "UPDATE project SET
    p_start_date=" . $sdate . ",
    p_end_date=" . $edate . ",
    p_fish_amount=" . $bamount . ",
    p_fish_begin_weight=" . $bweight . ",
    p_fish_end_weight=" . $eweight . " 
     WHERE p_key='" . $_SESSION["selectedKey"] . "'";

echo $sql;
if ($conn->query($sql) === TRUE) {
    echo "0";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
