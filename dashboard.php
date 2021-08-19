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
    <link rel="stylesheet" type="text/css" href="css/stylesheet-dashboard.css">
    <link rel="stylesheet" type="text/css" href="css/firework.css">
    <link rel="stylesheet" type="text/css" href="css/table.css">
    <!--===============================================================================================-->
</head>

<body onload="dashboard()">
    <div class="container container-fluid">
        <div class="row justify-content-between nav-bar">
            <div class="col-lg d-flex flex-nowrap align-items-center p-0">
                <img class="brand-icon" src="images/icons/brand-logo.png" />
                <h3 class="brand-name">SUT Feeder</h3>
            </div>
            <div class="col-lg text-right p-0">
                <a href="" data-toggle="modal" data-target="#"><i class="fa fa-bars fa-2x" aria-hidden="true"></i></a>
                <a href="" data-toggle="modal" data-target="#SettingModal"><i class="fa fa-cog fa-2x" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="row user-data">
            <div class="col-md">
                <i class="fa fa-user-circle" aria-hidden="true"></i> สวัสดี, คุณ<span id="user-fullname"></span></br />
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md user-data user-weather mr-2">
                <i class="fa fa-cloud mr-2" aria-hidden="true"></i>สภาพอากาศ: <span id="weatherTxt">-</span><br />
                <i class="fa fa-thermometer-three-quarters mr-2" aria-hidden="true"></i>อุณหภูมิ: <span id="celsiusTxt">-</span> &#8451;
            </div>
            <div class="col-md user-data">
                <i class="fa fa-calendar mr-2" aria-hidden="true"></i><span id="dateTxt"></span></br />
                <i class="fa fa-clock-o mr-2" aria-hidden="true"></i></i><span id="clock"></span>
            </div>
        </div>
        <div class="row user-data">
            <div class="col-md d-flex align-items-center">
                <div class="dropdown mr-2">
                    <button id="feeder-dropdown" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span id="ProjectNameDropdown">Project 1</span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="my-dropdown" id="dropdown-list">
                        <a class="dropdown-item" href="#">Project 1</a>
                        <a class="dropdown-item" href="#">Project 2</a>
                        <a class="dropdown-item" href="#">Project 3</a>
                    </div>
                </div>
                <a href=""><i class="fa fa-plus-circle fa-lg mr-2" aria-hidden="true"></i></a>
                <a href=""><i class="fa fa-minus-circle fa-lg" aria-hidden="true"></i></a>
            </div>
        </div>
        <div class="mt-2">
            <nav class="body-control">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">ให้อาหารปลา</a>
                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">ตั้งเวลา</a>
                    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">ข้อมูลการให้อาหาร</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="row manual-control">
                        <div class="container p-3 text-center">
                            <h4>ควบคุมการให้อาหารปลาด้วยตนเอง</h4>
                            <div class="justify-content-center">
                                <div><button class="btn btn-info btn-control">เริ่ม</button></div>
                                <div><button class="btn btn-danger btn-control">หยุด</button></div>
                                <div class="d-flex flex-nowrap justify-content-center align-items-center m-3">
                                    <span class="text-nowrap">ให้อาหารไปแล้ว</span>
                                    <input type="text" class="form-control" value="10" id="UsedFood">
                                    <span class="text-nowrap">กรัม/กิโลกรัม</span>
                                </div>
                                <div>
                                    <button class="btn btn-success">บันทึกข้อมูล</button>
                                    <button class="btn btn-secondary">ไม่บันทึกข้อมูล</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div class="row auto-control">
                        <div class="table-wrapper">
                            <div class="table-title">
                                <div class="row justify-content-between">
                                    <div class="col-auto" style="align-self:center !important">
                                        <h4>ตั้งเวลาให้อาหารปลาอัติโนมัติ</h4>
                                    </div>
                                    <div class="col-auto">
                                        <button type="button" id="AddNewRowBtn" class="btn btn-info btn-sm add-new"><i class="fa fa-plus"></i><span id="AddRowBtnTxt">Add New</span></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row table-body">
                                <table class="table table-responsive table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Subhash</td>
                                            <td>Administration</td>
                                            <td>88***88***</td>
                                            <td>
                                                <a class="add" title="Add" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons"></i></a>
                                                <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div class="row feeding-control">

                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php require 'modal.html' ?>

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
    <script src="js/dashboard.js"></script>
    <script src="js/weather.js"></script>

</body>

</html>