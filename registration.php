<?php
session_start();

if (isset($_SESSION["m_id"])) {
    header("location:dashboard.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>SUT Feeder</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--===============================================================================================-->
    <link rel="icon" type="image/png" href="images/icons/brand-logo.png" />
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
    <!--===============================================================================================-->
    <link rel="stylesheet" type="text/css" href="css/util.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link rel="stylesheet" type="text/css" href="css/stylesheet-registration.css">
    <!--===============================================================================================-->
</head>

<body>

    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100">
                <!-- Register -->
                <form class="login100-form validate-form" action="php/add-registration.php" method="POST">
                    <span class="login100-form-title">
                        สมัครสมาชิก
                    </span>

                    <div class="wrap-input100 validate-input" data-validate="กรอกข้อมูลให้ครบถ้วน">
                        <input class="input100" type="text" name="firstname">
                        <span class="focus-input100"></span>
                        <span class="label-input100">ชื่อ</span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="กรอกข้อมูลให้ครบถ้วน">
                        <input class="input100" type="text" name="sirname">
                        <span class="focus-input100"></span>
                        <span class="label-input100">นามสกุล</span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="กรอกอีเมล์ให้ถูกต้อง เช่น ex@ex.com">
                        <input class="input100" type="text" name="email">
                        <span class="focus-input100"></span>
                        <span class="label-input100">อีเมล์</span>
                    </div>

                    <div class="wrap-input100 validate-input" data-validate="รหัสผ่าน 8-20 ตัว ประกอบด้วย a-Z และ 0-9">
                        <input class="input100" type="password" name="pass">
                        <span class="focus-input100"></span>
                        <span class="label-input100">รหัสผ่าน</span>
                    </div>

                    <div class="m-2 mb-3">
                        <div class="login-failed" id="RegisFailedText">
                            <?php
                            if (isset($_COOKIE["FailedTxt"])) {
                                echo $_COOKIE["FailedTxt"];
                            }
                            ?>
                        </div>
                    </div>

                    <div class="container-login100-form-btn">
                        <button class="login100-form-btn btn-login">
                            สมัครสมาชิก
                        </button>
                    </div>

                    <div class="text-center p-t-46 p-b-20">
                        <span class="txt2">หรือ </span><a href="index.php">ลงชื่อ</a><span class="txt2"> เพื่อเข้าใช้งาน </span>
                    </div>
                </form>

                <div class="login100-more flex-c-m bg-img">
                    <div class="justfy-content-center align-items-center brand-name">
                        SMART AUTO FEEDER SYSTEM
                    </div>
                </div>
            </div>
        </div>
    </div>





    <!--===============================================================================================-->
    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/animsition/js/animsition.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/bootstrap/js/popper.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/select2/select2.min.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/daterangepicker/moment.min.js"></script>
    <script src="vendor/daterangepicker/daterangepicker.js"></script>
    <!--===============================================================================================-->
    <script src="vendor/countdowntime/countdowntime.js"></script>
    <!--===============================================================================================-->
    <script src="js/registration.js"></script>

</body>

</html>