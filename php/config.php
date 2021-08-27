<?php
/*$servername = "localhost";
$username = "root";
$password = "";
$db = "feeder";*/

$servername = "157.245.149.179";
$username = "io";
$password = "7777777777yU";
$db = "feeder";

// Create connection
$conn = new mysqli($servername, $username, $password, $db);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
