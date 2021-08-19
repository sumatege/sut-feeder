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

if (isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["firstname"]) && isset($_POST["sirname"])) {

    $sqlexist = "SELECT * FROM member WHERE m_email='" . $_POST["email"] . "'";
    $resultexist = $conn->query($sqlexist);
    if ($resultexist->num_rows > 0) {
        setcookie("FailedTxt", "แจ้งเตือน: อีเมล์นี้ถูกลงทะเบียนซ้ำแล้ว กรุณาใช้อีเมล์ใหม่", time() + 5, "/");
        header('Location: ../registration.php');
    } else {
        $sql = "INSERT INTO member (m_email, m_password, m_name, m_sirname, m_create_date) 
                VALUES ('" . $_POST["email"] . "', '" . $_POST["pass"] . "', '" . $_POST["firstname"] . "', '" . $_POST["sirname"] . "', '" . date("Y-m-d") . "')";

        if ($conn->query($sql) === TRUE) {
            $sqlmember = "SELECT * FROM member WHERE m_email='" . $_POST["email"] . "' AND m_password='" . $_POST["pass"] . "'";
            $result = $conn->query($sqlmember);
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $_SESSION["m_id"] = $row["m_id"];
                    $_SESSION["m_name"] = $row["m_name"];
                    $_SESSION["m_sirname"] = $row["m_sirname"];
                    $_SESSION["m_email"] = $row["m_email"];
                    $_SESSION["m_password"] = $row["m_password"];
                    $_SESSION["m_create_date"] = $row["m_create_date"];
                    $_SESSION["m_latlong"] = $row["m_latlong"];                    
                    /*$_SESSION["m_view"] = $row["m_view"];*/
                }
                header('Location: ../setup-location.php');
            } else {
                header('Location: ../registration.php');
                setcookie("FailedTxt", "แจ้งเตือน: ลงทะเบียนไม่สำเร็จ กรุณาลองใหม่อีกครั้ง", time() + 5, "/");
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
