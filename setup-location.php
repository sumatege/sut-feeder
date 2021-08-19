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
    <link rel="stylesheet" type="text/css" href="css/stylesheet-setup-location.css">
    <!--===============================================================================================-->
</head>

<body>
    <div class="container container-fluid">
        <center>
            <div class="body-content">
                <div class="row justify-content-center">
                    <h4 class="text-nowrap">ค้นหาตำแหน่งปัจจุบันของคุณ</h4>
                    <hr style="width:100%" />
                </div>
                <div class="row justify-content-center latlon-content align-content-center">
                    <button class="btn btn-info m-2" onclick="getLocation()">ค้นหาตำแหน่ง</button>
                </div>
                <div class="row justify-content-center latlon-content align-content-center">
                    <div id="location-data" style="display:none">
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <span id="latlong"></span>
                    <span id="failedStrat"></span>
                </div>
                <div class="row">
                    <hr style="width:100%" />
                    <div class="col-12 btn-control d-flex justify-content-between">
                        <button class="btn btn-secondary" onclick="skip()">ข้าม</button>
                        <button class="btn btn-success btn-start m-2" id="BtnStart" onclick="SaveLocation()">ถัดไป</button>
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
    <script src="js/weather.js"></script>

</body>

</html>