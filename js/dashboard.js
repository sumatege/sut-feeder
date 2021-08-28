var fullname;
var timeperround = 0;
var latilongti = "";

function Dashboard() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-session.php";
  xhttp.onload = function () {
    if (this.responseText == "0") {
      startTime();
      GetDropdownList();
      getProjectInfo();
      GetAutomationTable();
      GetHistory();
      MachineStatus();
      member();
      $("#ModalInclude").load("modal.html");
    } else {
      window.location.replace("./index.html");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function member() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-member.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.responseText);
    if (this.responseText != "0") {
      document.getElementById("user-fullname").innerHTML = data.m_name + " " + data.m_sirname + " [รหัสผู้ใช้: " + data.m_id + "]";
      document.getElementById("user-name").innerHTML = data.m_name + " " + data.m_sirname;
      document.getElementById("user-phone").innerHTML = data.m_phone;
      document.getElementById("user-create-date").innerHTML = data.m_create_date;
      document.getElementById("user-id").innerHTML = data.m_id;

      greeting(data.m_name + " " + data.m_sirname);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  var todayDate = new Date();
  var date = todayDate.toLocaleDateString();

  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  document.getElementById("dateTxt").innerHTML = date;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

function getWeather() {
  if (latilongti != "") {
    var latlong = latilongti.split(",");
    var sep_lat = latlong[0];
    var sep_long = latlong[1];

    var url = weatherApi + "&lat=" + sep_lat + "&lon=" + sep_long;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var data = JSON.parse(this.responseText);
      var cel = parseFloat(data.main.temp) - 273.15;
      document.getElementById("weatherTxt").innerHTML =
        data.weather[0].description;
      document.getElementById("celsiusTxt").innerHTML = cel.toFixed(2);
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("weatherTxt").innerHTML = "-";
    document.getElementById("celsiusTxt").innerHTML = "-";
  }

  //setTimeout(getWeather, 60000);
}

function greeting(name) {
  document.getElementById("user-greeting").innerHTML = name;
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-greeting.php";
  xhttp.onload = function () {
    if (this.responseText == "0") {
      $("#FirstTimeModal").modal("show");
      setTimeout(() => {
        document.getElementById("firework").style.display = "none";
        document.body.style.overflowY = "scroll";
      }, 5000);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function GetDropdownList() {
  let projectlist = document.querySelector("#dropdown-list");
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-project-list.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (this.response != "1") {
      document.getElementById("btn_r_close").disabled = false;
      document.getElementById("btn_r_close").style.opacity = 1;
      document.getElementById("btn_r_edit").disabled = false;
      document.getElementById("btn_r_edit").style.opacity = 1;
      document.getElementById("AddNewRowBtn").disabled = false;
      document.getElementById("AddNewRowBtn").style.opacity = 1;
      document.getElementById("mstartfeed").disabled = false;
      document.getElementById("mstartfeed").style.opacity = 1;

      data.forEach((results) => {
        projectlist.insertAdjacentHTML(
          "beforeend",
          '<a class="dropdown-item" onclick="setSelectedProject(' +
            results["p_id"] +
            ')">' +
            results["p_name"] +
            "</a>"
        );
      });

      //Set dropdown head
      const ddxhttp = new XMLHttpRequest();
      var ddurl = "./php/get-session-dropdown.php";
      ddxhttp.onload = function () {
        var ddresponse = JSON.parse(this.responseText);
        if (ddresponse != "1") {
          document.getElementById("ProjectNameDropdown").innerHTML =
            ddresponse.selectedName;
          latilongti = ddresponse.selectedLatlon;
          //getWeather(ddresponse.selectedLatlon);
        } else {
          document.getElementById("ProjectNameDropdown").innerHTML =
            data[0].p_name;
          latilongti = data[0].p_latlon;
          //getWeather(data[0].p_latlon);
          setSelectedProject(data[0].p_id);
        }
        getWeather();
      };
      ddxhttp.open("GET", ddurl);
      ddxhttp.send();
    } else {
      document.getElementById("ProjectNameDropdown").innerHTML =
        "กรุณาเพิ่มอุปกรณ์";
      document.getElementById("btn_r_close").disabled = true;
      document.getElementById("btn_r_close").style.opacity = 0.1;
      document.getElementById("btn_r_edit").disabled = true;
      document.getElementById("btn_r_edit").style.opacity = 0.1;
      document.getElementById("AddNewRowBtn").disabled = true;
      document.getElementById("AddNewRowBtn").style.opacity = 0.1;
      document.getElementById("mstartfeed").disabled = true;
      document.getElementById("mstartfeed").style.opacity = 0.1;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function setSelectedProject(key) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/set-selected-project.php?key=" + key;
  xhttp.onload = function () {
    window.location.replace("./dashboard.html");
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function getProjectInfo() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-project-data.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    document.getElementById("r_startdate").value = data.p_start_date;
    document.getElementById("r_beginweight").value = data.p_fish_begin_weight;
    document.getElementById("r_beginamount").value = data.p_fish_amount;
    document.getElementById("r_endweight").value = data.p_fish_end_weight;
    document.getElementById("r_totalfoodG").value = data.p_food_used;
    document.getElementById("r_totalfoodK").value =
      parseFloat(data.p_food_used) / 1000;
    document.getElementById("r_fcr").value = data.p_fcr;

    if (data.p_fish_end_weight == 0) {
      document.getElementById("r_plusweight").value = 0;
    } else {
      document.getElementById("r_plusweight").value =
        parseFloat(data.p_fish_end_weight) -
        parseFloat(data.p_fish_begin_weight);
    }

    if (data.p_end_date != null) {
      document.getElementById("r_enddate").value = data.p_end_date;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function RecordEdit() {
  document.getElementById("btn_r_cancel").style.display = "block";
  document.getElementById("btn_r_edit").style.display = "none";
  document.getElementById("btn_r_save").style.display = "block";

  document.getElementById("r_startdate").disabled = false;
  document.getElementById("r_enddate").disabled = false;
  document.getElementById("r_beginweight").disabled = false;
  document.getElementById("r_beginamount").disabled = false;
  document.getElementById("r_endweight").disabled = false;
}

function RecordCancel() {
  document.getElementById("btn_r_cancel").style.display = "none";
  document.getElementById("btn_r_edit").style.display = "block";
  document.getElementById("btn_r_save").style.display = "none";

  document.getElementById("r_startdate").disabled = true;
  document.getElementById("r_enddate").disabled = true;
  document.getElementById("r_beginweight").disabled = true;
  document.getElementById("r_beginamount").disabled = true;
  document.getElementById("r_endweight").disabled = true;

  getProjectInfo();
}

function RecordSave() {
  document.getElementById("btn_r_cancel").style.display = "none";
  document.getElementById("btn_r_edit").style.display = "block";
  document.getElementById("btn_r_save").style.display = "none";

  document.getElementById("r_startdate").disabled = true;
  document.getElementById("r_enddate").disabled = true;
  document.getElementById("r_beginweight").disabled = true;
  document.getElementById("r_beginamount").disabled = true;
  document.getElementById("r_endweight").disabled = true;

  var r_startdate = document.getElementById("r_startdate").value;
  var r_enddate = document.getElementById("r_enddate").value;
  var r_beginweight = document.getElementById("r_beginweight").value;
  var r_endweight = document.getElementById("r_endweight").value;
  var r_beginamount = document.getElementById("r_beginamount").value;

  var r_startdate = checkNull(r_startdate);
  var r_enddate = checkNull(r_enddate);
  var r_beginweight = checkNull(r_beginweight);
  var r_endweight = checkNull(r_endweight);
  var r_beginamount = checkNull(r_beginamount);

  const xhttp = new XMLHttpRequest();
  var url = "./php/update-project-data.php";
  url =
    url +
    "?sdate=" +
    r_startdate +
    "&edate=" +
    r_enddate +
    "&bweight=" +
    r_beginweight +
    "&bamount=" +
    r_beginamount +
    "&eweight=" +
    r_endweight;
  xhttp.onload = function () {
    getProjectInfo();
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function checkNull(val) {
  if (val == "") {
    return null;
  } else {
    return val;
  }
}

function SaveAutomation() {
  //var a_sdate = document.getElementById("a_sdate").value;
  //var a_edate = document.getElementById("a_edate").value;
  var a_time = document.getElementById("a_time").value;
  var a_total = document.getElementById("a_total").value;
  var a_round = document.getElementById("a_round").value;
  var a_break = document.getElementById("a_break").value;
  var a_foodsize = document.getElementById("a_foodsize").value;

  if (
    //a_sdate != "" &&
    //a_edate != "" &&
    a_time != "" &&
    a_total != "" &&
    a_round != "" &&
    a_break != "" &&
    a_foodsize != ""
  ) {
    var weightpertime = a_total / a_round;
    CalculateTimePerRound(weightpertime, a_foodsize);
  } else {
    $("#FullfilldataModal").modal("show");
  }
}

function CalculateTimePerRound(foodweight, foodsize) {
  switch (foodsize) {
    case "1":
      Calculate1(foodweight);
      break;
    case "2":
      Calculate2(foodweight);
      break;
    case "5":
      Calculate3(foodweight);
      break;
    default:
      break;
  }
}

function Calculate1(foodweight) {
  const getJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  //console.log(usetime + ' ' + foodsize);

  getJSON("./files/foodsize.txt").then(function (data) {
    data.forEach(function (item) {
      if (foodweight >= item.onek) {
        timeperround = item.time;
        return false;
      } else {
        return true;
      }
    });

    SaveFinishAutomation();
    $("#AddAutomationForm")[0].reset();
  });
}

function Calculate2(foodweight) {
  const getJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  //console.log(usetime + ' ' + foodsize);

  getJSON("./files/foodsize.txt").then(function (data) {
    data.forEach(function (item) {
      if (foodweight >= item.twok) {
        timeperround = item.time;
        return false;
      } else {
        return true;
      }
    });

    SaveFinishAutomation();
    document.getElementById("AddAutomationForm")[0].reset();
  });
}

function Calculate3(foodweight) {
  const getJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  //console.log(usetime + ' ' + foodsize);

  getJSON("./files/foodsize.txt").then(function (data) {
    data.forEach(function (item) {
      if (foodweight >= item.fivek) {
        timeperround = item.time;
        return false;
      } else {
        return true;
      }
    });

    SaveFinishAutomation();
    document.getElementById("AddAutomationForm")[0].reset();
  });
}

function SaveFinishAutomation() {
  //var a_sdate = document.getElementById("a_sdate").value;
  //var a_edate = document.getElementById("a_edate").value;
  var a_time = document.getElementById("a_time").value;
  var a_total = document.getElementById("a_total").value;
  var a_round = document.getElementById("a_round").value;
  var a_break = document.getElementById("a_break").value * 60;

  const xhttp = new XMLHttpRequest();
  var url = "./php/add-automation.php";
  url =
    url +
    "?time=" +
    a_time +
    "&total=" +
    a_total +
    "&round=" +
    a_round +
    "&break=" +
    a_break +
    "&tpr=" +
    timeperround;
  xhttp.onload = function () {
    $("#AutomationModal").modal("hide");
    GetAutomationTable();
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function enddatemindate(val) {
  document.getElementById("a_edate").setAttribute("min", val);
}

function GetAutomationTable() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-automation-table.php";
  xhttp.onload = function () {
    var recorddata = JSON.parse(this.response);
    if (recorddata != 1) {
      drawTable(recorddata);
    } else {
      $("#tbody").empty();
      var row = $("<tr />");
      $("#AutomationTable").append(row);
      row.append(
        $(
          "<td colspan='8' style='text-align:center;font-size: smaller'>ไม่พบข้อมูล</td>"
        )
      );
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function drawTable(data) {
  var count = Object.keys(data).length;

  $("#tbody").empty();
  for (var i = 0; i < count; i++) {
    if (data[i] != null) {
      drawRow(data[i]);
    }
  }
}

function drawRow(rowData) {
  var switchval = "";
  var onchange = "";
  if (rowData.a_switch == 1) {
    switchval = "";
    onchange = "1";
  } else {
    switchval = "checked";
    onchange = "0";
  }

  var slide =
    '<label class="switch"><input type="checkbox" id="' +
    rowData.a_id +
    '" ' +
    switchval +
    ' onchange="SwitchAutomation(' +
    rowData.a_id +
    ", " +
    onchange +
    ')"><span class="slider round"></span></label>';
  var row = $("<tr />");
  $("#AutomationTable").append(row);
  //row.append($("<td>" + rowData.a_begin_date + "</td>"));
  //row.append($("<td>" + rowData.a_end_date + "</td>"));
  row.append($("<td>" + rowData.a_feeding_time.substring(0, 5) + "</td>"));
  row.append($("<td>" + rowData.a_food_weight + "</td>"));
  row.append($("<td>" + rowData.a_round + "</td>"));
  row.append($("<td>" + rowData.a_time_per_round + "</td>"));
  row.append($("<td>" + rowData.a_break_time + "</td>"));
  row.append($("<td>" + slide + "</td>"));
  row.append(
    $(
      "<td><a href='#' onclick='DeleteAutomation(" +
        rowData.a_id +
        ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
    )
  );
}

function DeleteAutomation(id) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/delete-automation.php?id=" + id;
  xhttp.onload = function () {
    GetAutomationTable();
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SwitchAutomation(id, value) {
  var onchange = "";
  if (value == 0) {
    onchange = 1;
  } else {
    onchange = 0;
  }

  const xhttp = new XMLHttpRequest();
  var url = "./php/update-automation.php?id=" + id + "&switch=" + onchange;
  xhttp.onload = function () {
    GetAutomationTable();
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function DeleteProject() {
  var confirm = document.getElementById("ConfirmDeleteTxt").value;
  if (confirm != "") {
    const xhttp = new XMLHttpRequest();
    var url = "./php/get-confirm-delete.php?val=" + confirm;
    xhttp.onload = function () {
      if (this.response == "0") {
        document.getElementById("DelProTxt").style.display = "none";
        $("#DeleteProectModal").modal("hide");
        window.location.replace("./dashboard.html");
      } else {
        document.getElementById("DelProTxt").innerHTML =
          "เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง!";
        document.getElementById("DelProTxt").style.display = "block";
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("DelProTxt").innerHTML = "กรุณากรอกข้อมูล!";
    document.getElementById("DelProTxt").style.display = "block";
  }
}

function SaveNewProject() {
  var key = document.getElementById("add_key").value;
  var name = document.getElementById("add_name").value;
  var weight = document.getElementById("add_begin_weight").value;
  var amount = document.getElementById("add_fish_amout").value;

  if (key != "" && name != "" && weight != "" && amount != "") {
    document.getElementById("fillempty").style.display = "none";
    const xhttp = new XMLHttpRequest();
    var url = "./php/add-project.php";
    url =
      url +
      "?key=" +
      key +
      "&name=" +
      name +
      "&weight=" +
      weight +
      "&amount=" +
      amount;
    xhttp.onload = function () {
      if (this.responseText == 0) {
        $("#AddProjectModal").modal("hide");
        $("#AddLocationModal").modal("show");
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("fillempty").innerHTML =
      "** กรุณากรอกข้อมูลให้ครบถ้วน!";
    document.getElementById("fillempty").style.display = "block";
  }
}

function checkKey(key) {
  var txt;

  if (key.length == 10) {
    const xhttp = new XMLHttpRequest();
    var url = "./php/get-project.php?key=" + key;
    xhttp.onload = function () {
      var data = this.responseText;
      if (data == "0") {
        txt = "** ใช้รหัสอุปกรณ์นี้ได้";
        document.getElementById("keyStatus").style.color = "green";
        document.getElementById("BtnStart").disabled = false;
      } else if (data == "1") {
        txt = "** ไม่พบรหัสอุปกรณ์ที่ระบุ กรุณาตรวจสอบอีกครั้ง";
        document.getElementById("keyStatus").style.color = "red";
      } else {
        txt = "** รหัสอุปกรณ์ที่ระบุถูกใช้แล้ว ไม่สามารถใส่ซ้ำได้";
        document.getElementById("keyStatus").style.color = "red";
      }

      document.getElementById("keyStatus").innerHTML = txt;
      document.getElementById("keyStatus").style.display = "block";
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("keyStatus").style.display = "none";
  }
}

function RecordClose() {
  var confirm = document.getElementById("ConfirmCloseTxt").value;
  if (confirm != "") {
    const xhttp = new XMLHttpRequest();
    var url = "./php/close-project.php";
    xhttp.onload = function () {
      if (this.responseText == 0) {
        if (this.response == "0") {
          document.getElementById("DelProTxt").style.display = "none";
          $("#CloseProjectModal").modal("hide");
          window.location.replace("./dashboard.html");
        } else {
          document.getElementById("DelProTxt").innerHTML =
            "เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง!";
          document.getElementById("DelProTxt").style.display = "block";
        }
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("DelProTxt").innerHTML = "กรุณากรอกข้อมูล!";
    document.getElementById("DelProTxt").style.display = "block";
  }
}

function getLocationD() {
  document.getElementById("failedStrat").style.display = "none";
  document.getElementById("latlong").style.display = "none";
  document.getElementById("locationdata").style.display = "block";
  setTimeout(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionD, showError);
    } else {
      document.getElementById("latlong").innerHTML = "Geolocation is not supported by this browser.";
    }
  }, 2000);
}

function showPositionD(position) {
  document.getElementById("latlong").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  document.getElementById("latlong").style.display = "block";
  lat = position.coords.latitude;
  long = position.coords.longitude;
  document.getElementById("locationdata").style.display = "none";
}

function SaveNewLocation() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/save-location.php";
  url = url + "?lat=" + lat + "&long=" + long;
  xhttp.onload = function () {
    //console.log(this.responseText);
    if (this.responseText == "0") {
      window.location.replace("./dashboard.html");
    } else {
      document.getElementById("failedStrat").style.display = "block";
      document.getElementById("failedStrat").innerHTML =
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function GetHistory(){
  var txt = "";
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-history.php";
  xhttp.onload = function () {
    if (this.responseText != "1") {
      var data = JSON.parse(this.response);
      data.forEach((results) => {
        var increseWeight = parseFloat(results["c_fish_end_weight"]) - parseFloat(results["c_fish_begin_weight"]);
        var convFood = parseFloat(results["c_food_used"])/1000;
        txt = txt + '<button class="btn btn-primary btn-history" type="button" data-toggle="collapse" data-target="#collapseExample' + results["c_id"] + '" aria-expanded="false" aria-controls="collapseExample">' + results["c_end_date"] + ' - ' + results["c_name"] + '</button>';
        txt = txt + '<div class="collapse collapse-history" id="collapseExample' + results["c_id"] + '">';
        txt = txt + '<div class="card card-body"><div class="row">';
        txt = txt + '<div class="col-md-12">ชื่อ: ' + results["c_name"] + '</div>';
        txt = txt + '<div class="col-md-12">รหัสอุปกรณ์: ' + results["c_key"] + '</div>';
        txt = txt + '<div class="col-md-12">วันที่เริ่มต้น: ' + results["c_start_date"] + '</div>';
        txt = txt + '<div class="col-md-12">วันที่สิ้นสุด: ' + results["c_end_date"] + '</div>';
        txt = txt + '<div class="col-md-12">จำนวนปลา: ' + results["c_fish_amount"] + ' ตัว</div>';
        txt = txt + '<div class="col-md-12">น้ำหนักปลาเริ่มต้น: ' + results["c_fish_begin_weight"] + ' กก.</div>';
        txt = txt + '<div class="col-md-12">น้ำหนักปลาสุดท้าย: ' + results["c_fish_end_weight"] + ' กก.</div>';
        txt = txt + '<div class="col-md-12">น้ำหนักปลาที่เพิ่มขึ้น: ' + increseWeight + ' กก.</div>';
        txt = txt + '<div class="col-md-12">อาหารที่ใช้ทั้งหมด: ' + convFood + ' กก.</div>';
        txt = txt + '<div class="col-md-12">อัตราการเปลี่ยนอาหารเป็นเนื้อ : ' + results["c_fcr"] + '</div>';
        txt = txt + '</div></div></div>';
      });
      document.getElementById("modal-content-history").innerHTML = txt;
    }else{
      document.getElementById("modal-content-history").innerHTML = "<span>ไม่มีประวัติการบันทึกข้อมูล</span>";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function RefreshPage(){
  window.location.replace("./dashboard.html"); 
}