<?php
/*$servername = "localhost";
$username = "root";
$password = "";
$db = "feeder";
*/

/*
$servername = "remotemysql.com";
$username = "YOVzbEn8XW";
$password = "VBA5JgCdGV";
$db = "YOVzbEn8XW";
*/

$servername = "159.89.204.217";
$username = "root";
$password = "2021@Password";
$db = "sut-feeder";


// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
