<<<<<<< HEAD
<?php

require 'config.php';

$sql = "SELECT * FROM automation WHERE a_project_key='" . $_GET["p_key"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "error";
}


$conn->close();
=======
<?php

$servername = "remotemysql.com";
$username = "YOVzbEn8XW";
$password = "VBA5JgCdGV";
$db = "YOVzbEn8XW";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM automation WHERE a_project_key='" . $_GET["p_key"] . "'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "error";
}


$conn->close();
>>>>>>> 64dc6b66e1673190933029b2b08d29b7dddd6390
