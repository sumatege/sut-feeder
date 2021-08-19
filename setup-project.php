<?php
session_start();

if (!isset($_SESSION["m_id"])) {
    header("location:index.php");
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
    <link rel="stylesheet" type="text/css" href="css/stylesheet-setup-project.css">
    <!--===============================================================================================-->
</head>

<body>
    <div class="container container-fluid">
        <center>
            <div class="body-content">
                <div class="row justify-content-center">
                    <h4 class="text-nowrap">เริ่มการใช้งาน</h4>
                    <hr style="width:100%" />
                </div>
                <div class="row justify-content-center">
                    <form>
                        <div class="form-group">
                            <label>ชื่อโครงการ</label>
                            <input type="text" class="form-control" id="name" required />
                        </div>
                        <div class="form-group">
                            <label>น้ำหนักปลาเริ่มต้น</label>
                            <input type="number" class="form-control" id="begin_weight" min="0" value="0" required>
                        </div>
                        <div class="form-group">
                            <label>จำนวนปลาเริ่มต้น</label>
                            <input type="number" class="form-control" id="fish_amout" min="0" value="0" required>
                        </div>
                        <div class="form-group">
                            <label>ขนาดเมล็ดอาหาร (มม.)</label>
                            <div class="dropdown">
                                <button id="FoodSize" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    1
                                </button>
                                <div class="dropdown-menu" id="FoodSizeList" aria-labelledby="FoodSize">
                                    <a class="dropdown-item" href="#">1</a>
                                    <a class="dropdown-item" href="#">2</a>
                                    <a class="dropdown-item" href="#">5</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="row">
                    <hr style="width:100%" />
                    <div class="col-12 btn-control d-flex justify-content-between">
                        <button class="btn btn-secondary" onclick="skip()">ข้าม</button>
                        <button class="btn btn-primary" id="BtnStart" onclick="SaveProject()">เริ่มการใช้งาน</button>
                    </div>
                </div>
            </div>
        </center>
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
    <script src="js/setup-project.js"></script>

</body>

</html>