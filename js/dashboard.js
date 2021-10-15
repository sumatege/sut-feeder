var fullname;
var timeperround = 0;
var latilongti = "";
var automation;
var weather_status = "";
var project_weather_status;
var food_unit;

function Dashboard() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-session.php";
  xhttp.onload = function () {
    if (this.responseText == "0") {
      startTime();
      GetDropdownList();
      GetAutomationTable();
      MachineStatus();
      CheckTimeWeatherStatus();
      member();
      getProjectInfo();
      if (sessionStorage.getItem("SelectPage") == null) {
        SelectPage(1);
      } else {
        SelectPage(sessionStorage.getItem("SelectPage"));
      }
      $("#ModalInclude").load("modal.html");
    } else if (this.responseText == "2") {
      window.location.replace("./admin.html");
    } else {
      window.location.replace("./index.html");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SettingModal() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-member.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.responseText);
    if (this.responseText != "0") {
      document.getElementById("user-name").value = data.m_name;
      document.getElementById("user-sirname").value = data.m_sirname;
      document.getElementById("user-phone").value = data.m_phone;
      document.getElementById("user-create-date").value = data.m_create_date;
      document.getElementById("user-id").value = data.m_id;

      document.getElementById("member-btn").style.display = "none";
      document.getElementById("password-change").style.display = "none";

      GetFoodUnit();
      $("#SettingModal").modal("show");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function GetFoodUnit() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-project-data.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.responseText);
    ChangeUnitSettingModal(data.p_food_unit);
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
      document.getElementById("user-fullname").innerHTML =
        data.m_name + " " + data.m_sirname + " [รหัสผู้ใช้: " + data.m_id + "]";
      greeting(data.m_name + " " + data.m_sirname);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
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

var count_weather_alert = 0;
function getWeather() {
  if (
    latilongti != "" &&
    latilongti != null &&
    latilongti != "undefined,undefined"
  ) {
    var latlong = latilongti.split(",");
    var sep_lat = latlong[0];
    var sep_long = latlong[1];
    //alert("Get weather: " + latilongti);

    var url = weatherApi + "&lat=" + sep_lat + "&lon=" + sep_long;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      var data = JSON.parse(this.responseText);
      var cel = parseFloat(data.main.temp) - 273.15;
      document.getElementById("weatherTxt").innerHTML =
        data.weather[0].description;
      document.getElementById("celsiusTxt").innerHTML = cel.toFixed(2);

      //alert(data.weather.length);
      for (var i = 0; i < data.weather.length; i++) {
        weather_status = data.weather[i].main;
        //alert(i + " " + data.weather[i].main);
        if (data.weather[i].main == "Rain") {
          break;
        }
      }

      if (weather_status == "Rain") {
        if (count_weather_alert == 0) {
          CheckWeatherStatus();
        }

        count_weather_alert += 1;
        if (count_weather_alert == 30) {
          count_weather_alert = 0;
        }
      } else {
        count_weather_alert = 0;
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    document.getElementById("weatherTxt").innerHTML = "-";
    document.getElementById("celsiusTxt").innerHTML = "-";
  }

  setTimeout(getWeather, 60000);
}

function CheckWeatherStatus() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-project-data.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (data.p_weather_status == 1) {
      project_weather_status = 1;
      sessionStorage.setItem("project_weather_status", 1);
      $("#WeatherModal").modal("show");
    } else {
      project_weather_status = 0;
      sessionStorage.setItem("project_weather_status", 0);
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
      document.getElementById("DeleteProjectBtn").disabled = false;
      document.getElementById("DeleteProjectBtn").style.opacity = 1;

      $("#dropdown-list").empty();
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
      document.getElementById("DeleteProjectBtn").disabled = true;
      document.getElementById("DeleteProjectBtn").style.opacity = 0.1;
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
    document.getElementById("r_beginamount").value = data.p_fish_amount;
    document.getElementById("r_fcr").value = parseFloat(data.p_fcr).toFixed(2);
    food_unit = data.p_food_unit;

    if (data.p_end_date != null) {
      document.getElementById("r_enddate").value = data.p_end_date;
    }

    if (data.p_food_unit == "g") {
      document.getElementById("r_beginweight").value =
        parseFloat(data.p_fish_begin_weight) * 1000;
      document.getElementById("r_endweight").value =
        parseFloat(data.p_fish_end_weight) * 1000;
      document.getElementById("r_totalfood").value = parseFloat(
        data.p_food_used
      );

      if (data.p_fish_end_weight == 0) {
        document.getElementById("r_plusweight").value = 0;
      } else {
        document.getElementById("r_plusweight").value =
          (parseFloat(data.p_fish_end_weight) -
            parseFloat(data.p_fish_begin_weight)) *
          1000;
      }
      $(".UnitTextFeedingManual").html("กรัม");
    } else {
      document.getElementById("r_beginweight").value = data.p_fish_begin_weight;
      document.getElementById("r_endweight").value = data.p_fish_end_weight;
      document.getElementById("r_totalfood").value =
        parseFloat(data.p_food_used) / 1000;

      if (data.p_fish_end_weight == 0) {
        document.getElementById("r_plusweight").value = 0;
      } else {
        document.getElementById("r_plusweight").value =
          parseFloat(data.p_fish_end_weight) -
          parseFloat(data.p_fish_begin_weight);
      }
      $(".UnitTextFeedingManual").html("กิโลกรัม");
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
  var r_startdate = document.getElementById("r_startdate").value;
  var r_enddate = document.getElementById("r_enddate").value;
  var r_beginweight = document.getElementById("r_beginweight").value;
  var r_endweight = document.getElementById("r_endweight").value;
  var r_beginamount = document.getElementById("r_beginamount").value;
  var r_usedfood = document.getElementById("r_totalfood").value;

  var r_startdate = checkNull(r_startdate);
  var r_enddate = checkNull(r_enddate);
  var r_beginweight = checkNull(r_beginweight);
  var r_endweight = checkNull(r_endweight);
  var r_beginamount = checkNull(r_beginamount);

  var r_fcr;
  if (r_endweight != null) {
    var diff = parseFloat(r_endweight) - parseFloat(r_beginweight);
    r_fcr = parseFloat(r_usedfood) / 1000 / diff;
  } else {
    r_fcr = 0;
  }

  document.getElementById("btn_r_cancel").style.display = "none";
  document.getElementById("btn_r_edit").style.display = "block";
  document.getElementById("btn_r_save").style.display = "none";

  document.getElementById("r_startdate").disabled = true;
  document.getElementById("r_enddate").disabled = true;
  document.getElementById("r_beginweight").disabled = true;
  document.getElementById("r_beginamount").disabled = true;
  document.getElementById("r_endweight").disabled = true;

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
    r_endweight +
    "&fcr=" +
    r_fcr;
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
    if (food_unit == "g") {
      weightpertime = parseFloat(a_total) / 1000;
      weightpertime = weightpertime / parseFloat(a_round);
    } else {
      weightpertime = parseFloat(a_total) / parseFloat(a_round);
    }
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
    case "0":
      var kgpersec = document.getElementById("a_self_weight").value;
      if (food_unit == "g") {
        kgpersec / 1000;
      }
      Calculate0(foodweight, kgpersec);
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
    document.getElementById("AddAutomationForm").reset();
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
    document.getElementById("AddAutomationForm").reset();
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
    document.getElementById("AddAutomationForm").reset();
  });
}

function Calculate0(foodweight, kgpersec) {
  timeperround = parseFloat(foodweight) / parseFloat(kgpersec);
  SaveFinishAutomation();
  document.getElementById("AddAutomationForm").reset();
}

function SaveFinishAutomation() {
  //var a_sdate = document.getElementById("a_sdate").value;
  //var a_edate = document.getElementById("a_edate").value;
  var a_time = document.getElementById("a_time").value;
  var a_total = document.getElementById("a_total").value;
  var a_round = document.getElementById("a_round").value;
  var a_break = document.getElementById("a_break").value;
  var a_foodsize = document.getElementById("a_foodsize").value;

  if (food_unit == "g") {
    a_total = parseFloat(a_total) / 1000;
  }

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
    timeperround +
    "&foodsize=" +
    a_foodsize;
  xhttp.onload = function () {
    $("#AutomationModal").modal("hide");
    GetAutomationTable();
    document.getElementById("a_otherSize").style.display = "none";
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
      automation = recorddata;
      CheckAutomation();
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
  var slide = "";

  if (rowData.a_switch == 1) {
    switchval = "";
    onchange = "1";
  } else {
    switchval = "checked";
    onchange = "0";
  }

  if (project_weather_status == 0) {
    slide =
      '<label class="switch"><input disabled type="checkbox" id="' +
      rowData.a_id +
      '" ' +
      switchval +
      ' onchange="SwitchAutomation(' +
      rowData.a_id +
      ", " +
      onchange +
      ')"><span class="slider round"></span></label>';
  } else {
    slide =
      '<label class="switch"><input type="checkbox" id="' +
      rowData.a_id +
      '" ' +
      switchval +
      ' onchange="SwitchAutomation(' +
      rowData.a_id +
      ", " +
      onchange +
      ')"><span class="slider round"></span></label>';
  }

  var food_weight;
  if (food_unit == "g") {
    food_weight = rowData.a_food_weight * 1000;
  } else {
    food_weight = rowData.a_food_weight;
  }

  var tpr;
  if (parseFloat(rowData.a_time_per_round) % 1 == 0) {
    tpr = parseFloat(rowData.a_time_per_round);
  } else {
    tpr = parseFloat(rowData.a_time_per_round).toFixed(2);
  }

  var row = $("<tr />");
  $("#AutomationTable").append(row);
  //row.append($("<td>" + rowData.a_begin_date + "</td>"));
  //row.append($("<td>" + rowData.a_end_date + "</td>"));
  row.append($("<td>" + rowData.a_feeding_time.substring(0, 5) + "</td>"));
  row.append($("<td>" + food_weight + "</td>"));
  row.append($("<td>" + rowData.a_round + "</td>"));
  row.append($("<td>" + tpr + "</td>"));
  row.append($("<td>" + rowData.a_break_time + "</td>"));
  row.append($("<td style='display: none;'>" + rowData.a_status + "</td>"));
  row.append($("<td>" + slide + "</td>"));
  row.append(
    $(
      "<td><a href='#' onclick='DeleteAutomation(" +
        rowData.a_id +
        ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
    )
  );
}

function CheckAutomation() {
  var data = automation;
  var count = Object.keys(data).length;
  var ws_data;

  const ws_xhttp = new XMLHttpRequest();
  var ws_url = "./php/get-project-data.php";
  ws_xhttp.onload = function () {
    ws_data = JSON.parse(this.response);

    for (var i = 0; i < count; i++) {
      var today = new Date();
      var starttime =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0") +
        ":00";
      var endtime =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0") +
        ":15";
      var checkTime =
        String(today.getHours()).padStart(2, "0") +
        ":" +
        String(today.getMinutes()).padStart(2, "0") +
        ":" +
        String(today.getSeconds()).padStart(2, "0");

      const cr_date_format = "YYYY-MM-DD HH:mm:ss";
      var cr_date = new Date();
      cr_date = moment(cr_date).format(cr_date_format);
      let new_cr_date = cr_date;

      //console.log(starttime + " " + data[i].a_feeding_time);
      //console.log(endtime + " " + checkTime);
      if (ws_data.p_weather_status == "1") {
        if (
          starttime == data[i].a_feeding_time &&
          data[i].a_switch == 0 &&
          checkTime <= endtime
        ) {
          const xhttp = new XMLHttpRequest();
          var url =
            "./php/set-automation-status.php?status=0&id=" +
            data[i].a_id +
            "&datetime=" +
            new_cr_date +
            "&key=" +
            data[i].a_project_key;
          xhttp.onload = function () {
            //console.log(this.responseText);
            RefreshAutomationTable();
          };
          xhttp.open("GET", url);
          xhttp.send();
        } else {
          const xhttp = new XMLHttpRequest();
          var url =
            "./php/set-automation-status.php?status=1&id=" +
            data[i].a_id +
            "&datetime=" +
            new_cr_date +
            "&key=" +
            data[i].a_project_key;
          xhttp.onload = function () {
            RefreshAutomationTable();
          };
          xhttp.open("GET", url);
          xhttp.send();
        }
        document.getElementById("CloseAutoFeed").style.display = "none";
      } else {
        const xhttp = new XMLHttpRequest();
        var url =
          "./php/set-automation-status.php?status=1&id=" +
          data[i].a_id +
          "&datetime=" +
          new_cr_date +
          "&key=" +
          data[i].a_project_key;
        xhttp.onload = function () {
          document.getElementById("CloseAutoFeed").style.display = "block";
          document.getElementById("CloseAutoFeed_date").innerHTML =
            ws_data.p_weather_start_time;
          RefreshAutomationTable();
        };
        xhttp.open("GET", url);
        xhttp.send();
      }
    }
  };
  ws_xhttp.open("GET", ws_url);
  ws_xhttp.send();

  //console.log(starttime);
  setTimeout(CheckAutomation, 1000);
}

function RefreshAutomationTable() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-automation-table.php";
  xhttp.onload = function () {
    var recorddata = JSON.parse(this.response);
    if (recorddata != 1) {
      drawTable(recorddata);
      automation = recorddata;
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

  if (food_unit == "g") {
    weight = parseFloat(weight) / 1000;
  }

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
      amount +
      "&unit=" +
      food_unit;
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

function CheckRecordClose() {
  var edate = document.getElementById("r_enddate").value;
  if (edate == "" || edate == null) {
    $("#EnddateModal").modal("show");
  } else {
    $("#CloseProjectModal").modal("show");
  }
}

function RecordClose() {
  var confirm = document.getElementById("ConfirmCloseTxt").value;
  if (confirm != "") {
    const xhttp = new XMLHttpRequest();
    var url = "./php/close-project.php?password=" + confirm;
    xhttp.onload = function () {
      if (this.response == "0") {
        document.getElementById("CloseProTxt").style.display = "none";
        $("#CloseProjectModal").modal("hide");
        window.location.replace("./dashboard.html");
      } else {
        document.getElementById("CloseProTxt").innerHTML =
          "เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง!";
        document.getElementById("CloseProTxt").style.color = "red";
        document.getElementById("CloseProTxt").style.fontSize = "small";
        document.getElementById("CloseProTxt").style.display = "block";
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
      document.getElementById("latlong").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }, 2000);
}

function showPositionD(position) {
  document.getElementById("latlong").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
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

function getLocationD2() {
  document.getElementById("failedStrat2").style.display = "none";
  document.getElementById("latlong2").style.display = "none";
  document.getElementById("locationdata2").style.display = "block";
  setTimeout(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPositionD2, showError);
    } else {
      document.getElementById("latlong").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }, 2000);
}

function showPositionD2(position) {
  document.getElementById("latlong2").innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  document.getElementById("latlong2").style.display = "block";
  lat = position.coords.latitude;
  long = position.coords.longitude;
  document.getElementById("locationdata2").style.display = "none";
}

function SaveNewLocation2() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/save-location-2.php";
  url = url + "?lat=" + lat + "&long=" + long;
  xhttp.onload = function () {
    //console.log(this.responseText);
    if (this.responseText == "0") {
      window.location.replace("./dashboard.html");
    } else {
      document.getElementById("failedStrat2").style.display = "block";
      document.getElementById("failedStrat2").innerHTML =
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function GetHistory() {
  var txt = "";
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-history.php";
  xhttp.onload = function () {
    if (this.responseText != "1") {
      var data = JSON.parse(this.response);
      data.forEach((results) => {
        var increseWeight =
          parseFloat(results["c_fish_end_weight"]) -
          parseFloat(results["c_fish_begin_weight"]);
        var convFood = parseFloat(results["c_food_used"]) / 1000;
        txt =
          txt +
          '<button class="btn btn-primary btn-history" type="button" data-toggle="collapse" data-target="#collapseExample' +
          results["c_id"] +
          '" aria-expanded="false" aria-controls="collapseExample">' +
          results["c_end_date"] +
          " - " +
          results["c_name"] +
          "</button>";
        txt =
          txt +
          '<div class="collapse collapse-history" id="collapseExample' +
          results["c_id"] +
          '">';
        txt = txt + '<div class="card card-body"><div class="row">';
        txt =
          txt + '<div class="col-md-12">ชื่อ: ' + results["c_name"] + "</div>";
        txt =
          txt +
          '<div class="col-md-12">รหัสอุปกรณ์: ' +
          results["c_key"] +
          "</div>";
        txt =
          txt +
          '<div class="col-md-12">วันที่เริ่มต้น: ' +
          results["c_start_date"] +
          "</div>";
        txt =
          txt +
          '<div class="col-md-12">วันที่สิ้นสุด: ' +
          results["c_end_date"] +
          "</div>";
        txt =
          txt +
          '<div class="col-md-12">จำนวนปลา: ' +
          results["c_fish_amount"] +
          " ตัว</div>";
        txt =
          txt +
          '<div class="col-md-12">น้ำหนักปลาเริ่มต้น: ' +
          results["c_fish_begin_weight"] +
          " กก.</div>";
        txt =
          txt +
          '<div class="col-md-12">น้ำหนักปลาสุดท้าย: ' +
          results["c_fish_end_weight"] +
          " กก.</div>";
        txt =
          txt +
          '<div class="col-md-12">น้ำหนักปลาที่เพิ่มขึ้น: ' +
          increseWeight +
          " กก.</div>";
        txt =
          txt +
          '<div class="col-md-12">อาหารที่ใช้ทั้งหมด: ' +
          convFood +
          " กก.</div>";
        txt =
          txt +
          '<div class="col-md-12">อัตราการเปลี่ยนอาหารเป็นเนื้อ : ' +
          results["c_fcr"] +
          "</div>";
        txt = txt + "</div></div></div>";
      });
      document.getElementById("modal-content-history").innerHTML = txt;
    } else {
      document.getElementById("modal-content-history").innerHTML =
        "<span>ไม่มีประวัติการบันทึกข้อมูล</span>";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function RefreshPage() {
  window.location.replace("./dashboard.html");
}

function AddUnitModal() {
  $("#SettingModal").modal("hide");
  $("#AddUnitModal").modal("show");
}

function checkSize(value) {
  if (value == 0) {
    document.getElementById("otherSize").style.display = "block";
  } else {
    document.getElementById("otherSize").style.display = "none";
  }
}

function acheckSize(value) {
  if (value == 0) {
    document.getElementById("a_otherSize").style.display = "block";
  } else {
    document.getElementById("a_otherSize").style.display = "none";
  }
}

function SetupStopAutomation() {
  $("#WeatherModal").modal("hide");
  $("#SetupStopAutomationModal").modal("show");
}

function SaveSetupStopAutomation() {
  var restart_date = document.getElementById("RestartAutoDate").value;
  if (restart_date != "") {
    document.getElementById("RestartAutoDateTxt").style.display = "none";
    var today = new Date(restart_date);
    var datetime =
      "'" +
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0") +
      " " +
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":00'";
    APISaveSetupStopAutomation(0, datetime);
  } else {
    document.getElementById("RestartAutoDateTxt").innerHTML =
      "** กรุณาระบุวันที่และเวลาให้ครบถ้วน";
    document.getElementById("RestartAutoDateTxt").style.display = "block";
  }
}

function CheckTimeWeatherStatus() {
  if (project_weather_status == 0) {
    var today = new Date();
    var datetime =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0") +
      " " +
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0") +
      ":00";

    const xhttp = new XMLHttpRequest();
    var url = "./php/get-project-data.php";
    xhttp.onload = function () {
      var data = JSON.parse(this.response);
      //console.log(datetime + " " + data.p_weather_start_time);
      if (data.p_weather_status == 0 && data.p_weather_start_time == datetime) {
        APISaveSetupStopAutomation(1, null);
        document.getElementById("CloseAutoFeed").style.display = "none";
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  }

  setTimeout(CheckTimeWeatherStatus, 1000);
}

function CancelDisabledAutomotion() {
  APISaveSetupStopAutomation(1, null);
  document.getElementById("CloseAutoFeed").style.display = "none";
}

function APISaveSetupStopAutomation(status, restart_date) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/save-restart-stop-automation.php";
  url = url + "?status=" + status + "&date=" + restart_date;
  xhttp.onload = function () {
    //console.log(this.response);
    if (this.responseText == "0") {
      RefreshPage();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function ChangeUnit(val) {
  if (val == "g") {
    document.getElementById("add-btn-g").style.border = "medium solid #1C319F";
    document.getElementById("add-btn-g").style.background = "white";
    document.getElementById("add-btn-g").style.opacity = "1";
    document.getElementById("add-btn-g").style.color = "black";

    document.getElementById("add-btn-kg").style.border = "none";
    document.getElementById("add-btn-kg").style.opacity = "0.5";
    document.getElementById("add-btn-kg").style.color = "gray";

    document.getElementById("UnitTxt").innerHTML = "กรัม";
    food_unit = "g";
    sessionStorage.setItem("food_unit", "g");
  } else {
    document.getElementById("add-btn-kg").style.border = "medium solid #1C319F";
    document.getElementById("add-btn-kg").style.background = "white";
    document.getElementById("add-btn-kg").style.opacity = "1";
    document.getElementById("add-btn-kg").style.color = "black";
    document.getElementById("add-btn-g").style.border = "none";
    document.getElementById("add-btn-g").style.opacity = "0.5";
    document.getElementById("add-btn-g").style.color = "gray";

    document.getElementById("UnitTxt").innerHTML = "กิโลกรัม";
    food_unit = "kg";
    sessionStorage.setItem("food_unit", "kg");
  }
}

function ChangeUnitSettingModal(val) {
  if (val == "g") {
    document.getElementById("btn-g").style.border = "medium solid #1C319F";
    document.getElementById("btn-g").style.background = "white";
    document.getElementById("btn-g").style.opacity = "1";
    document.getElementById("btn-g").style.color = "black";

    document.getElementById("btn-kg").style.border = "none";
    document.getElementById("btn-kg").style.opacity = "0.5";
    document.getElementById("btn-kg").style.color = "gray";

    document.getElementById("project_current_unit").innerHTML = val;

    UpdateUnitBySettingModal("g");
    Get4PondsInfo();
    Get4PondsAutomationTable();
    food_unit = "g";
    sessionStorage.setItem("food_unit", "g");
  } else {
    document.getElementById("btn-kg").style.border = "medium solid #1C319F";
    document.getElementById("btn-kg").style.background = "white";
    document.getElementById("btn-kg").style.opacity = "1";
    document.getElementById("btn-kg").style.color = "black";

    document.getElementById("btn-g").style.border = "none";
    document.getElementById("btn-g").style.opacity = "0.5";
    document.getElementById("btn-g").style.color = "gray";

    document.getElementById("project_current_unit").innerHTML = val;

    UpdateUnitBySettingModal("kg");
    Get4PondsInfo();
    Get4PondsAutomationTable();
    food_unit = "kg";
    sessionStorage.setItem("food_unit", "kg");
  }
}

function UpdateUnitBySettingModal(val) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/update-unit-modal.php?unit=" + val;
  xhttp.open("GET", url);
  xhttp.send();
}

var oldname = "";
var oldsirname = "";
var oldphone = "";
function EditMemberFn() {
  var name = document.getElementById("user-name").value;
  var sirname = document.getElementById("user-sirname").value;
  var phone = document.getElementById("user-phone").value;
  oldname = document.getElementById("user-name").value;
  oldsirname = document.getElementById("user-sirname").value;
  oldphone = document.getElementById("user-phone").value;

  document.getElementById("user-name").disabled = false;
  document.getElementById("user-sirname").disabled = false;
  document.getElementById("user-phone").disabled = false;
  document.getElementById("member-btn").style.display = "block";
}

function EditPwFn() {
  document.getElementById("SaveChangePWBtn").disabled = true;
  document.getElementById("SaveChangePWBtn").style.opacity = "0.3";
  document.getElementById("password-change").style.display = "block";
}

function SaveEditSetting(val) {
  if (val == 1) {
    var name = document.getElementById("user-name").value;
    var sirname = document.getElementById("user-sirname").value;
    var phone = document.getElementById("user-phone").value;
    const xhttp = new XMLHttpRequest();
    var url =
      "./php/save-edit-member-data.php?name=" +
      name +
      "&sirname=" +
      sirname +
      "&phone=" +
      phone;
    xhttp.onload = function () {
      document.getElementById("user-name").value = name;
      document.getElementById("user-sirname").value = sirname;
      document.getElementById("user-phone").value = phone;
      document.getElementById("user-name").disabled = true;
      document.getElementById("user-sirname").disabled = true;
      document.getElementById("user-phone").disabled = true;
      document.getElementById("member-btn").style.display = "none";
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else if (val == 2) {
    document.getElementById("user-name").value = oldname;
    document.getElementById("user-sirname").value = oldsirname;
    document.getElementById("user-phone").value = oldphone;
    document.getElementById("user-name").disabled = true;
    document.getElementById("user-sirname").disabled = true;
    document.getElementById("user-phone").disabled = true;
    document.getElementById("member-btn").style.display = "none";
  } else if (val == 3) {
    var newpw = document.getElementById("pw-new").value;
    const xhttp = new XMLHttpRequest();
    var url = "./php/save-edit-password.php?newpw=" + newpw;
    xhttp.onload = function () {
      document.getElementById("pw-old").value = "";
      document.getElementById("pw-new").value = "";
      document.getElementById("pw-cf").value = "";
      document.getElementById("password-change").style.display = "none";
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else if (val == 4) {
    document.getElementById("pw-old").value = "";
    document.getElementById("pw-new").value = "";
    document.getElementById("pw-cf").value = "";
    document.getElementById("password-change").style.display = "none";
  }
}

function CheckConfirmPassword() {
  var pw = document.getElementById("pw-old").value;
  var newpw = document.getElementById("pw-new").value;
  var cfpw = document.getElementById("pw-cf").value;

  const xhttp = new XMLHttpRequest();
  var url = "./php/get-member.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (data.m_password == pw && pw != "") {
      document.getElementById("OldPwTxt").style.display = "none";

      if (newpw == pw) {
        document.getElementById("ConfirmPwTxt").innerHTML =
          "**กรุณาใช้รหัสผ่านใหม่ที่ไม่ซ้ำกับรหัสผ่านเดิม";
        document.getElementById("ConfirmPwTxt").style.display = "block";
      } else {
        document.getElementById("ConfirmPwTxt").style.display = "none";
        if (newpw != "" && cfpw != "") {
          if (newpw == cfpw) {
            document.getElementById("ConfirmPwTxt").style.display = "none";
            document.getElementById("SaveChangePWBtn").disabled = false;
            document.getElementById("SaveChangePWBtn").style.opacity = "1";
          } else {
            document.getElementById("ConfirmPwTxt").innerHTML =
              "**กรุณากรอกยืนยันรหัสผ่านให้ถูกต้อง";
            document.getElementById("ConfirmPwTxt").style.display = "block";
            document.getElementById("SaveChangePWBtn").disabled = true;
            document.getElementById("SaveChangePWBtn").style.opacity = "0.3";
          }
        } else {
          document.getElementById("SaveChangePWBtn").disabled = true;
          document.getElementById("SaveChangePWBtn").style.opacity = "0.3";
        }
      }
    } else {
      document.getElementById("OldPwTxt").style.display = "block";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function CheckMemberData() {
  var name = document.getElementById("user-name").value;
  var sirname = document.getElementById("user-sirname").value;
  var phone = document.getElementById("user-phone").value;
  if (name != "" && sirname != "" && phone != "") {
    document.getElementById("SaveMemberBtn").disabled = false;
    document.getElementById("SaveMemberBtn").style.opacity = "1";
  } else {
    document.getElementById("SaveMemberBtn").disabled = true;
    document.getElementById("SaveMemberBtn").style.opacity = "0.3";
  }
}

function SelectPage(val) {
  document.getElementById("pond_type").value = val;
  if (val == "1") {
    setSelectedProjectWhenChangePage();
    //alert("Into selectoage: 1 " + latilongti);

    document.getElementById("user-data-div").style.display = "block";
    document.getElementById("control-dashboard-div-1").style.display = "block";
    document.getElementById("control-dashboard-div-2").style.display = "none";
    document.getElementById("weather1").style.display = "block";
    document.getElementById("weather2").style.display = "none";
    sessionStorage.setItem("SelectPage", "1");
  } else {
    fourponds();
    //alert("Into selectoage: 2 " + latilongti);

    document.getElementById("user-data-div").style.display = "none";
    document.getElementById("control-dashboard-div-1").style.display = "none";
    document.getElementById("control-dashboard-div-2").style.display = "block";
    document.getElementById("weather1").style.display = "none";
    document.getElementById("weather2").style.display = "block";
    sessionStorage.setItem("SelectPage", "2");
  }
}

function setSelectedProjectWhenChangePage() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/set-selected-project-when-change-page.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (data != "1") {
      latilongti = data.p_latlon;
      //console.log("Into selectoage when change page: " + latilongti + " key " + data.p_key);
      getWeather();
    } else {
      latilongti = null;
      document.getElementById("weatherTxt").innerHTML = "-";
      document.getElementById("celsiusTxt").innerHTML = "-";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

var TopBtn = document.getElementById("TopBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
    TopBtn.style.display = "block";
  } else {
    TopBtn.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(function () {
  $("#AddProjectModal").on("show.bs.modal", function () {
    document.getElementById("add-btn-g").style.border = "medium solid #1C319F";
    document.getElementById("add-btn-g").style.background = "white";
    document.getElementById("add-btn-g").style.opacity = "1";
    document.getElementById("add-btn-g").style.color = "black";

    document.getElementById("add-btn-kg").style.border = "none";
    document.getElementById("add-btn-kg").style.opacity = "0.5";
    document.getElementById("add-btn-kg").style.color = "gray";

    document.getElementById("UnitTxt").innerHTML = "กรัม";
    food_unit = "g";
  });

  $("#HistoryModal").on("show.bs.modal", function () {
    GetHistory();
  });

  $("#CloseProjectModal").on("show.bs.modal", function () {
    document.getElementById("CloseProTxt").style.display = "none";
  });

  $("#AutomationModal").on("show.bs.modal", function () {
    if (food_unit == "g") {
      $(".UnitTextFeedingManual").html("กรัม");
    } else {
      $(".UnitTextFeedingManual").html("กิโลกรัม");
    }
  });

  $("#4PondsAutomationModal").on("show.bs.modal", function () {
    if (food_unit == "g") {
      $(".UnitTextFeedingManual").html("กรัม");
    } else {
      $(".UnitTextFeedingManual").html("กิโลกรัม");
    }
  });

  $("#SettingModal").on("hide.bs.modal", function () {
    if (food_unit == "g") {
      $(".UnitTextFeedingManual").html("กรัม");
      getProjectInfo();
    } else {
      $(".UnitTextFeedingManual").html("กิโลกรัม");
      getProjectInfo();
    }
  });

  $("#AddLocationModal").on("hide.bs.modal", function () {
    RefreshPage();
  });
});
