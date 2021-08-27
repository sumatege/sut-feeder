<?php

session_start();
require 'config.php';

/*
$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
$charactersLength = strlen($characters);
$randomString = '';
for ($i = 0; $i < 10; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
}
*/

if (isset($_POST["phone"]) && isset($_POST["pass"]) && isset($_POST["firstname"]) && isset($_POST["sirname"])) {

    $sqlexist = "SELECT * FROM member WHERE m_phone='" . $_POST["phone"] . "'";
    $resultexist = $conn->query($sqlexist);
    if ($resultexist->num_rows > 0) {
        setcookie("FailedTxt", "เบอร์โทรศัพท์นี้ถูกลงทะเบียนซ้ำแล้ว กรุณาใช้เบอร์โทรศัพท์ใหม่", time() + 5, "/");
        header('Location: ../registration.html');
    } else {
        $sql = "INSERT INTO member (m_phone, m_password, m_name, m_sirname, m_create_date) 
                VALUES ('" . $_POST["phone"] . "', '" . $_POST["pass"] . "', '" . $_POST["firstname"] . "', '" . $_POST["sirname"] . "', '" . date("Y-m-d") . "')";

        if ($conn->query($sql) === TRUE) {
            $sqlmember = "SELECT * FROM member WHERE m_phone='" . $_POST["phone"] . "' AND m_password='" . $_POST["pass"] . "'";
            $result = $conn->query($sqlmember);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $_SESSION["m_id"] = $row["m_id"];
                    $_SESSION["m_name"] = $row["m_name"];
                    $_SESSION["m_sirname"] = $row["m_sirname"];
                    $_SESSION["m_phone"] = $row["m_phone"];
                    $_SESSION["m_password"] = $row["m_password"];
                    $_SESSION["m_create_date"] = $row["m_create_date"];
                    /*$_SESSION["m_view"] = $row["m_view"];*/
                }
                header('Location: ../setup-project.html');
            } else {
                header('Location: ../registration.html');
                setcookie("FailedTxt", "ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", time() + 5, "/");
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
