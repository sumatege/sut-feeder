<?php

session_start();
require 'config.php';

if (isset($_POST["phone"]) && isset($_POST["pass"])) {
    $user = $_POST["phone"];
    $pw = $_POST["pass"];

    $sql = "SELECT * FROM member WHERE m_phone='" . $user . "' AND m_password='" . $pw . "'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $_SESSION["m_id"] = $row["m_id"];
            $_SESSION["m_name"] = $row["m_name"];
            $_SESSION["m_sirname"] = $row["m_sirname"];
            $_SESSION["m_phone"] = $row["m_phone"];
            $_SESSION["m_password"] = $row["m_password"];
            $_SESSION["m_create_date"] = $row["m_create_date"];
            $_SESSION["m_latlong"] = $row["m_latlong"];
            /*$_SESSION["m_view"] = $row["m_view"];*/
        }
        
        if($_SESSION["m_id"] == '0'){
            header('Location: ../admin.html');
        }else{
            header('Location: ../dashboard.html');
        }
    } else {
        header('Location: ../index.html');
        setcookie("FailedTxt", "เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง", time() + 10, "/");
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


$conn->close();
