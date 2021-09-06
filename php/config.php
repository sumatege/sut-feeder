<?php
/*
$servername = "localhost";
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


$servername = "127.0.0.1";
$username = "sut-feeder";
$password = "2021@Password";
$db = "sut-feeder";



// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
