<?php

session_start();
require 'config.php';

if (isset($_POST["email"]) && isset($_POST["pass"])) {
    $user = $_POST["email"];
    $pw = $_POST["pass"];

    $sql = "SELECT * FROM member WHERE m_email='" . $user . "' AND m_password='" . $pw . "'";
    $result = $conn->query($sql);
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
        header('Location: ../dashboard.php');
    } else {
        header('Location: ../index.php');
        setcookie("FailedTxt", "แจ้งเตือน: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง", time() + 5, "/");
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();
