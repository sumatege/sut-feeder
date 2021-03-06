function fourponds() {
  Get4PondsInfo();
  Get4PondsAutomationTable();
  GetWeatherStatus_4ponds();
  FourPondsCheckTimeWeatherStatus();
  FourPondsEditButton();
}

function Get4PondsInfo() {
  var fcr1 = 0;
  var fcr2 = 0;
  var fcr3 = 0;
  var fcr4 = 0;
  var plus_weight1 = 0;
  var plus_weight2 = 0;
  var plus_weight3 = 0;
  var plus_weight4 = 0;

  const xhttp = new XMLHttpRequest();
  var url = "./php/get-four-ponds-data.php";
  xhttp.onload = function () {
    if (this.responseText != 1) {
      var data = JSON.parse(this.response);
      latilongti = data[0].latlon;
      getWeather();

      document.getElementById("1_startdate").value = data[0].start_date;
      document.getElementById("2_startdate").value = data[1].start_date;
      document.getElementById("3_startdate").value = data[2].start_date;
      document.getElementById("4_startdate").value = data[3].start_date;

      document.getElementById("1_beginamount").value = data[0].fish_amount;
      document.getElementById("2_beginamount").value = data[1].fish_amount;
      document.getElementById("3_beginamount").value = data[2].fish_amount;
      document.getElementById("4_beginamount").value = data[3].fish_amount;

      if (data[0].end_date != null) {
        document.getElementById("1_enddate").value = data[0].end_date;
      }

      if (data[1].end_date != null) {
        document.getElementById("2_enddate").value = data[1].end_date;
      }

      if (data[2].end_date != null) {
        document.getElementById("3_enddate").value = data[2].end_date;
      }

      if (data[3].end_date != null) {
        document.getElementById("4_enddate").value = data[3].end_date;
      }

      var unit = sessionStorage.getItem("food_unit");
      //alert("Info : " + unit);

      //To gram
      if (unit == "g") {
        //1
        document.getElementById("1_beginweight").value =
          parseFloat(data[0].begin_weight) * 1000;
        document.getElementById("1_endweight").value =
          parseFloat(data[0].end_weight) * 1000;
        document.getElementById("1_totalfood").value = parseFloat(
          data[0].food_used
        );

        //2
        document.getElementById("2_beginweight").value =
          parseFloat(data[1].begin_weight) * 1000;
        document.getElementById("2_endweight").value =
          parseFloat(data[1].end_weight) * 1000;
        document.getElementById("2_totalfood").value = parseFloat(
          data[1].food_used
        );

        //3
        document.getElementById("3_beginweight").value =
          parseFloat(data[2].begin_weight) * 1000;
        document.getElementById("3_endweight").value =
          parseFloat(data[2].end_weight) * 1000;
        document.getElementById("3_totalfood").value = parseFloat(
          data[2].food_used
        );

        //4
        document.getElementById("4_beginweight").value =
          parseFloat(data[3].begin_weight) * 1000;
        document.getElementById("4_endweight").value =
          parseFloat(data[3].end_weight) * 1000;
        document.getElementById("4_totalfood").value = parseFloat(
          data[3].food_used
        );

        //1
        if (data[0].end_weight == 0) {
          document.getElementById("1_plusweight").value = 0;
          document.getElementById("1_fcr").value = 0;
        } else {
          plus_weight1 =
            (parseFloat(data[0].end_weight) -
              parseFloat(data[0].begin_weight)) *
            1000;
          document.getElementById("1_plusweight").value = plus_weight1;

          fcr1 = parseFloat(data[0].food_used) / plus_weight1;
          document.getElementById("1_fcr").value = fcr1;
        }

        //2
        if (data[1].end_weight == 0) {
          document.getElementById("2_plusweight").value = 0;
          document.getElementById("2_fcr").value = 0;
        } else {
          plus_weight2 =
            (parseFloat(data[1].end_weight) -
              parseFloat(data[1].begin_weight)) *
            1000;
          document.getElementById("2_plusweight").value = plus_weight2;

          fcr2 = parseFloat(data[1].food_used) / plus_weight2;
          document.getElementById("2_fcr").value = fcr2;
        }

        //3
        if (data[2].end_weight == 0) {
          document.getElementById("3_plusweight").value = 0;
          document.getElementById("3_fcr").value = 0;
        } else {
          plus_weight3 =
            (parseFloat(data[2].end_weight) -
              parseFloat(data[2].begin_weight)) *
            1000;
          document.getElementById("3_plusweight").value = plus_weight3;

          fcr3 = parseFloat(data[2].food_used) / plus_weight3;
          document.getElementById("3_fcr").value = fcr3;
        }

        //4
        if (data[3].end_weight == 0) {
          document.getElementById("4_plusweight").value = 0;
          document.getElementById("4_fcr").value = 0;
        } else {
          plus_weight4 =
            (parseFloat(data[3].end_weight) -
              parseFloat(data[3].begin_weight)) *
            1000;
          document.getElementById("4_plusweight").value = plus_weight4;

          fcr4 = parseFloat(data[3].food_used) / plus_weight4;
          document.getElementById("4_fcr").value = fcr4;
        }
      } else {
        //To kilogram
        //1
        document.getElementById("1_beginweight").value = data[0].begin_weight;
        document.getElementById("1_endweight").value = data[0].end_weight;
        document.getElementById("1_totalfood").value =
          parseFloat(data[0].food_used) / 1000;

        //2
        document.getElementById("2_beginweight").value = data[1].begin_weight;
        document.getElementById("2_endweight").value = data[1].end_weight;
        document.getElementById("2_totalfood").value =
          parseFloat(data[1].food_used) / 1000;

        //3
        document.getElementById("3_beginweight").value = data[2].begin_weight;
        document.getElementById("3_endweight").value = data[2].end_weight;
        document.getElementById("3_totalfood").value =
          parseFloat(data[2].food_used) / 1000;

        //4
        document.getElementById("4_beginweight").value = data[3].begin_weight;
        document.getElementById("4_endweight").value = data[3].end_weight;
        document.getElementById("4_totalfood").value =
          parseFloat(data[3].food_used) / 1000;

        //1
        if (data[0].end_weight == 0) {
          document.getElementById("1_plusweight").value = 0;
          document.getElementById("1_fcr").value = 0;
        } else {
          plus_weight1 =
            parseFloat(data[0].end_weight) - parseFloat(data[0].begin_weight);
          document.getElementById("1_plusweight").value = plus_weight1;

          fcr1 = parseFloat(data[0].food_used) / 1000;
          fcr1 = fcr1 / plus_weight1;
          document.getElementById("1_fcr").value = fcr1;
        }

        //2
        if (data[1].end_weight == 0) {
          document.getElementById("2_plusweight").value = 0;
          document.getElementById("2_fcr").value = 0;
        } else {
          plus_weight2 =
            parseFloat(data[1].end_weight) - parseFloat(data[1].begin_weight);
          document.getElementById("2_plusweight").value = plus_weight2;

          fcr2 = parseFloat(data[1].food_used) / 1000;
          fcr2 = fcr2 / plus_weight2;
          document.getElementById("2_fcr").value = fcr2;
        }

        //3
        if (data[2].end_weight == 0) {
          document.getElementById("3_plusweight").value = 0;
          document.getElementById("3_fcr").value = 0;
        } else {
          plus_weight3 =
            parseFloat(data[2].end_weight) - parseFloat(data[2].begin_weight);
          document.getElementById("3_plusweight").value = plus_weight3;

          fcr3 = parseFloat(data[2].food_used) / 1000;
          fcr3 = fcr3 / plus_weight3;
          document.getElementById("3_fcr").value = fcr3;
        }

        //4
        if (data[3].end_weight == 0) {
          document.getElementById("4_plusweight").value = 0;
          document.getElementById("4_fcr").value = 0;
        } else {
          plus_weight4 =
            parseFloat(data[3].end_weight) - parseFloat(data[3].begin_weight);
          document.getElementById("4_plusweight").value = plus_weight4;

          fcr4 = parseFloat(data[3].food_used) / 1000;
          fcr4 = fcr4 / plus_weight4;
          document.getElementById("4_fcr").value = fcr4;
        }
      }
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

var four_ponds_automation;
function Get4PondsAutomationTable() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-4ponds-automation-table.php";
  xhttp.onload = function () {
    var recorddata = JSON.parse(this.response);
    if (recorddata != 1) {
      four_ponds_automation = recorddata;
      FourPondsCheckAutomation();

      draw4PondsTable(recorddata);
    } else {
      $("#bor-1-tbody").empty();
      $("#bor-2-tbody").empty();
      $("#bor-3-tbody").empty();
      $("#bor-4-tbody").empty();

      var row1 = $("<tr />");
      $("#bor-1-auto-table").append(row1);
      row1.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
        )
      );

      var row2 = $("<tr />");
      $("#bor-2-auto-table").append(row2);
      row2.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
        )
      );

      var row3 = $("<tr />");
      $("#bor-3-auto-table").append(row3);
      row3.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
        )
      );

      var row4 = $("<tr />");
      $("#bor-4-auto-table").append(row4);
      row4.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
        )
      );
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function draw4PondsTable(data) {
  var count = Object.keys(data).length;
  var check1 = 1;
  var check2 = 1;
  var check3 = 1;
  var check4 = 1;

  $("#bor-1-tbody").empty();
  $("#bor-2-tbody").empty();
  $("#bor-3-tbody").empty();
  $("#bor-4-tbody").empty();

  for (var i = 0; i < count; i++) {
    if (data[i] != null) {
      draw4PondsRow(data[i]);
    }

    if (data[i].equipment_no == "1") {
      check1 = 0;
    }

    if (data[i].equipment_no == "2") {
      check2 = 0;
    }

    if (data[i].equipment_no == "3") {
      check3 = 0;
    }

    if (data[i].equipment_no == "4") {
      check4 = 0;
    }
  }

  if (check1 == 1) {
    var row1 = $("<tr />");
    $("#bor-1-auto-table").append(row1);
    row1.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
      )
    );
  }

  if (check2 == 1) {
    var row2 = $("<tr />");
    $("#bor-2-auto-table").append(row2);
    row2.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
      )
    );
  }

  if (check3 == 1) {
    var row3 = $("<tr />");
    $("#bor-3-auto-table").append(row3);
    row3.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
      )
    );
  }

  if (check4 == 1) {
    var row4 = $("<tr />");
    $("#bor-4-auto-table").append(row4);
    row4.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>?????????????????????????????????????????????????????????????????????????????????</td>"
      )
    );
  }
}

function draw4PondsRow(rowData) {
  var switchval = "";
  var onchange = "";
  var slide = "";

  if (rowData.switch == 1) {
    switchval = "";
    onchange = "1";
  } else {
    switchval = "checked";
    onchange = "0";
  }

  var project_weather_status = sessionStorage.getItem("project_weather_status");
  if (project_weather_status == 0) {
    slide =
      '<label class="switch"><input disabled type="checkbox" id="' +
      rowData.id +
      '" ' +
      switchval +
      ' onchange="Switch4PondsAutomation(' +
      rowData.id +
      ", " +
      onchange +
      ')"><span class="slider round"></span></label>';
  } else {
    slide =
      '<label class="switch"><input type="checkbox" id="' +
      rowData.id +
      '" ' +
      switchval +
      ' onchange="Switch4PondsAutomation(' +
      rowData.id +
      ", " +
      onchange +
      ')"><span class="slider round"></span></label>';
  }

  var unit = sessionStorage.getItem("food_unit");
  //alert("Automation : " + unit);
  var food_weight;
  if (unit == "kg") {
    food_weight = parseFloat(rowData.food_weight) / 1000;
  } else {
    food_weight = rowData.food_weight;
  }

  var tusing;
  if (parseFloat(rowData.using_time) % 1 == 0) {
    tusing = parseFloat(rowData.using_time);
  } else {
    tusing = parseFloat(rowData.using_time).toFixed(2);
  }

  var row = $("<tr />");

  if (rowData.equipment_no == "1") {
    $("#bor-1-auto-table").append(row);
    row.append($("<td>" + rowData.feeding_time.substring(0, 5) + "</td>"));
    row.append($("<td>" + food_weight + "</td>"));
    row.append($("<td>" + slide + "</td>"));
    row.append(
      $(
        "<td><a href='#' onclick='Delete4PondsAutomation(" +
          rowData.id +
          ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
      )
    );
  } else if (rowData.equipment_no == "2") {
    $("#bor-2-auto-table").append(row);
    row.append($("<td>" + rowData.feeding_time.substring(0, 5) + "</td>"));
    row.append($("<td>" + food_weight + "</td>"));
    row.append($("<td>" + slide + "</td>"));
    row.append(
      $(
        "<td><a href='#' onclick='Delete4PondsAutomation(" +
          rowData.id +
          ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
      )
    );
  } else if (rowData.equipment_no == "3") {
    $("#bor-3-auto-table").append(row);
    row.append($("<td>" + rowData.feeding_time.substring(0, 5) + "</td>"));
    row.append($("<td>" + food_weight + "</td>"));
    row.append($("<td>" + slide + "</td>"));
    row.append(
      $(
        "<td><a href='#' onclick='Delete4PondsAutomation(" +
          rowData.id +
          ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
      )
    );
  } else if (rowData.equipment_no == "4") {
    $("#bor-4-auto-table").append(row);
    row.append($("<td>" + rowData.feeding_time.substring(0, 5) + "</td>"));
    row.append($("<td>" + food_weight + "</td>"));
    row.append($("<td>" + slide + "</td>"));
    row.append(
      $(
        "<td><a href='#' onclick='Delete4PondsAutomation(" +
          rowData.id +
          ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
      )
    );
  }
}

function Save4PondsAutomation() {
  var ponds = document.getElementById("4p_ponds").value;
  var feeding_time = document.getElementById("4p_time").value;
  var unit = sessionStorage.getItem("food_unit");
  var weight = parseFloat(document.getElementById("4p_weight").value);

  //alert("Save Automation : " + unit);
  if (unit == "kg") {
    weight = weight * 1000;
  } else {
    weight = weight;
  }

  if (feeding_time != "" && weight != "") {
    var newtime = feeding_time.split(":");
    var newdate = new Date();
    newdate.setHours(newtime[0]);
    newdate.setMinutes(newtime[1]);
    newdate.setMinutes(newdate.getMinutes() + 10);
    var abovetime =
      String(newdate.getHours()).padStart(2, "0") +
      ":" +
      String(newdate.getMinutes()).padStart(2, "0");
    newdate.setMinutes(newdate.getMinutes() - 20);
    var undertime =
      String(newdate.getHours()).padStart(2, "0") +
      ":" +
      String(newdate.getMinutes()).padStart(2, "0");
    //console.log(newdate.getHours() + ":" + newdate.getMinutes());
    //console.log(undertime + " " + abovetime);

    const xhttp = new XMLHttpRequest();
    var url = "./php/add-4ponds-automation.php";
    url =
      url +
      "?abovetime=" +
      abovetime +
      "&undertime=" +
      undertime +
      "&feeding_time=" +
      feeding_time +
      "&weight=" +
      weight +
      "&pond=" +
      ponds;
    xhttp.onload = function () {
      //console.log(this.responseText.substring(0, 1));
      if (this.responseText.substring(0, 1) == "1") {
        var data = JSON.parse(
          this.responseText.substring(1, this.responseText.length)
        );

        var atime = data[1].split(":");
        var new_a_time = new Date();
        new_a_time.setHours(atime[0]);
        new_a_time.setMinutes(atime[1]);
        new_a_time.setMinutes(new_a_time.getMinutes() + 11);
        var atimeplus =
          String(new_a_time.getHours()).padStart(2, "0") +
          ":" +
          String(new_a_time.getMinutes()).padStart(2, "0");

        var utime = data[0].split(":");
        var new_u_time = new Date();
        new_u_time.setHours(utime[0]);
        new_u_time.setMinutes(utime[1]);
        new_u_time.setMinutes(new_u_time.getMinutes() - 11);
        var utimeplus =
          String(new_u_time.getHours()).padStart(2, "0") +
          ":" +
          String(new_u_time.getMinutes()).padStart(2, "0");

        document.getElementById("alerttime").innerHTML =
          " " + utimeplus + " ???. ????????? " + atimeplus + " ???.";
        $("#4PondsAutomationAlertModal").modal("show");
      } else {
        window.location.replace("./dashboard.html");
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  } else {
    $("#FullfilldataModal").modal("show");
  }
}

function Switch4PondsAutomation(id, value) {
  var onchange = "";
  if (value == 0) {
    onchange = 1;
  } else {
    onchange = 0;
  }

  const xhttp = new XMLHttpRequest();
  var url =
    "./php/update-4ponds-automation.php?id=" + id + "&switch=" + onchange;
  xhttp.onload = function () {
    Get4PondsAutomationTable();
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function Delete4PondsAutomation(id) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/delete-4ponds-automation.php?id=" + id;
  xhttp.onload = function () {
    window.location.replace("./dashboard.html");
  };
  xhttp.open("GET", url);
  xhttp.send();
}

var count_weather_alert_4ponds = 0;
function GetWeather_4ponds() {
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
        //alert(weather_status);
        if (count_weather_alert_4ponds == 0) {
          CheckWeatherStatus_4ponds();
        }

        count_weather_alert_4ponds += 1;
        if (count_weather_alert_4ponds == 30) {
          count_weather_alert_4ponds = 0;
        }
      } else {
        count_weather_alert_4ponds = 0;
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

function CheckWeatherStatus_4ponds() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-4ponds-weather-data.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (data.weather_status == 1) {
      project_weather_status = 1;
      sessionStorage.setItem("project_weather_status", 1);
      $("#FourPondsWeatherModal").modal("show");
    } else {
      project_weather_status = 0;
      sessionStorage.setItem("project_weather_status", 0);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function GetWeatherStatus_4ponds() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-4ponds-weather-data.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (data != 1) {
      latilongti = data.latlon;
      GetWeather_4ponds();
    } else {
      latilongti = null;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsSetupStopAutomationModal() {
  $("#FourPondsWeatherModal").modal("hide");
  $("#FourPondsSetupStopAutomationModal").modal("show");
}

function SaveFourPondsSetupStopAutomation() {
  var restart_date = document.getElementById("4PondsRestartAutoDate").value;
  if (restart_date != "") {
    document.getElementById("FourPondsRestartAutoDateTxt").style.display =
      "none";
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
    FourPondsAPISaveSetupStopAutomation(0, datetime);
  } else {
    document.getElementById("FourPondsRestartAutoDateTxt").innerHTML =
      "** ????????????????????????????????????????????????????????????????????????????????????????????????";
    document.getElementById("FourPondsRestartAutoDateTxt").style.display =
      "block";
  }
}

function FourPondsAPISaveSetupStopAutomation(status, restart_date) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/save-restart-stop-4ponds-automation.php";
  url = url + "?status=" + status + "&date=" + restart_date;
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      window.location.replace("./dashboard.html");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsCancelDisabledAutomotion() {
  FourPondsAPISaveSetupStopAutomation(1, null);
  document.getElementById("FourPondsCloseAutoFeed").style.display = "none";
}

function FourPondsCheckTimeWeatherStatus() {
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
    var url = "./php/get-four-ponds-data-weather-time.php";
    xhttp.onload = function () {
      var data = JSON.parse(this.response);
      //console.log(datetime + " " + data.weather_start_time);
      if (data.weather_status == 0 && data.weather_start_time == datetime) {
        FourPondsAPISaveSetupStopAutomation(1, null);
        document.getElementById("FourPondsCloseAutoFeed").style.display =
          "none";
      }
    };
    xhttp.open("GET", url);
    xhttp.send();
  }

  setTimeout(FourPondsCheckTimeWeatherStatus, 1000);
}

function FourPondsCheckAutomation() {
  var data = four_ponds_automation;
  var count = Object.keys(data).length;
  var ws_data;

  const ws_xhttp = new XMLHttpRequest();
  var ws_url = "./php/get-four-ponds-data-weather-time.php";
  ws_xhttp.onload = function () {
    if (this.responseText != "1") {
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

        //console.log(starttime + " " + data[i].feeding_time);
        //console.log(endtime + " " + checkTime);

        if (ws_data.weather_status == "1") {
          if (
            starttime == data[i].feeding_time &&
            data[i].switch == 0 &&
            checkTime <= endtime
          ) {
            //console.log(1);
            const xhttp = new XMLHttpRequest();
            var url =
              "./php/set-four-ponds-automation-status.php?status=0&id=" +
              data[i].id;
            //console.log(url);
            xhttp.onload = function () {
              console.log(this.responseText);
              //RefreshAutomationTable();
              Get4PondsAutomationTable;
            };
            xhttp.open("GET", url);
            xhttp.send();
          } else {
            //console.log(2);
            const xhttp = new XMLHttpRequest();
            var url =
              "./php/set-four-ponds-automation-status.php?status=1&id=" +
              data[i].id;
            xhttp.onload = function () {
              //RefreshAutomationTable();
              Get4PondsAutomationTable;
            };
            xhttp.open("GET", url);
            xhttp.send();
          }
          document.getElementById("FourPondsCloseAutoFeed").style.display =
            "none";
        } else {
          //console.log(3);
          //alert(ws_data.weather_status);
          const xhttp = new XMLHttpRequest();
          var url =
            "./php/set-four-ponds-automation-status.php?status=1&id=" +
            data[i].id;
          xhttp.onload = function () {
            document.getElementById("FourPondsCloseAutoFeed").style.display =
              "block";
            document.getElementById("FourPondsCloseAutoFeed_date").innerHTML =
              ws_data.weather_start_time;
            //RefreshAutomationTable();
            Get4PondsAutomationTable;
          };
          xhttp.open("GET", url);
          xhttp.send();
        }
      }
    }
  };
  ws_xhttp.open("GET", ws_url);
  ws_xhttp.send();

  //console.log(starttime);
  setTimeout(FourPondsCheckAutomation, 1000);
}

function FourPondsEditButton() {
  document.getElementById("FPSave1Btn").disabled = "true";
  document.getElementById("FPCancel1Btn").disabled = "true";

  document.getElementById("FPSave2Btn").disabled = "true";
  document.getElementById("FPCancel2Btn").disabled = "true";

  document.getElementById("FPSave3Btn").disabled = "true";
  document.getElementById("FPCancel3Btn").disabled = "true";

  document.getElementById("FPSave4Btn").disabled = "true";
  document.getElementById("FPCancel4Btn").disabled = "true";
}

function FPEdit1() {
  document.getElementById("FPEdit1Btn").disabled = true;
  document.getElementById("FPSave1Btn").disabled = false;
  document.getElementById("FPCancel1Btn").disabled = false;

  document.getElementById("1_startdate").disabled = false;
  document.getElementById("1_enddate").disabled = false;
  document.getElementById("1_beginamount").disabled = false;
  document.getElementById("1_beginweight").disabled = false;
  document.getElementById("1_endweight").disabled = false;
}

function FPCancel1() {
  document.getElementById("FPEdit1Btn").disabled = false;
  document.getElementById("FPSave1Btn").disabled = true;
  document.getElementById("FPCancel1Btn").disabled = true;

  document.getElementById("1_startdate").disabled = true;
  document.getElementById("1_enddate").disabled = true;
  document.getElementById("1_beginamount").disabled = true;
  document.getElementById("1_beginweight").disabled = true;
  document.getElementById("1_endweight").disabled = true;

  Get4PondsInfo();
}

function FPSave1() {
  var sdate = document.getElementById("1_startdate").value;
  var edate = document.getElementById("1_enddate").value;
  var amount = document.getElementById("1_beginamount").value;
  var beginweight = document.getElementById("1_beginweight").value;
  var endweight = document.getElementById("1_endweight").value;

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-four-ponds-data.php";
  url =
    url +
    "?id=1&sdate=" +
    sdate +
    "&edate=" +
    edate +
    "&amount=" +
    amount +
    "&bweight=" +
    beginweight +
    "&eweight=" +
    endweight;
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      FPCancel1();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FPEdit2() {
  document.getElementById("FPEdit2Btn").disabled = true;
  document.getElementById("FPSave2Btn").disabled = false;
  document.getElementById("FPCancel2Btn").disabled = false;

  document.getElementById("2_startdate").disabled = false;
  document.getElementById("2_enddate").disabled = false;
  document.getElementById("2_beginamount").disabled = false;
  document.getElementById("2_beginweight").disabled = false;
  document.getElementById("2_endweight").disabled = false;
}

function FPCancel2() {
  document.getElementById("FPEdit2Btn").disabled = false;
  document.getElementById("FPSave2Btn").disabled = true;
  document.getElementById("FPCancel2Btn").disabled = true;

  document.getElementById("2_startdate").disabled = true;
  document.getElementById("2_enddate").disabled = true;
  document.getElementById("2_beginamount").disabled = true;
  document.getElementById("2_beginweight").disabled = true;
  document.getElementById("2_endweight").disabled = true;

  Get4PondsInfo();
}

function FPSave2() {
  var sdate = document.getElementById("2_startdate").value;
  var edate = document.getElementById("2_enddate").value;
  var amount = document.getElementById("2_beginamount").value;
  var beginweight = document.getElementById("2_beginweight").value;
  var endweight = document.getElementById("2_endweight").value;

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-four-ponds-data.php";
  url =
    url +
    "?id=2&sdate=" +
    sdate +
    "&edate=" +
    edate +
    "&amount=" +
    amount +
    "&bweight=" +
    beginweight +
    "&eweight=" +
    endweight;
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      FPCancel2();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FPEdit3() {
  document.getElementById("FPEdit3Btn").disabled = true;
  document.getElementById("FPSave3Btn").disabled = false;
  document.getElementById("FPCancel3Btn").disabled = false;

  document.getElementById("3_startdate").disabled = false;
  document.getElementById("3_enddate").disabled = false;
  document.getElementById("3_beginamount").disabled = false;
  document.getElementById("3_beginweight").disabled = false;
  document.getElementById("3_endweight").disabled = false;
}

function FPCancel3() {
  document.getElementById("FPEdit3Btn").disabled = false;
  document.getElementById("FPSave3Btn").disabled = true;
  document.getElementById("FPCancel3Btn").disabled = true;

  document.getElementById("3_startdate").disabled = true;
  document.getElementById("3_enddate").disabled = true;
  document.getElementById("3_beginamount").disabled = true;
  document.getElementById("3_beginweight").disabled = true;
  document.getElementById("3_endweight").disabled = true;

  Get4PondsInfo();
}

function FPSave3() {
  var sdate = document.getElementById("3_startdate").value;
  var edate = document.getElementById("3_enddate").value;
  var amount = document.getElementById("3_beginamount").value;
  var beginweight = document.getElementById("3_beginweight").value;
  var endweight = document.getElementById("3_endweight").value;

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-four-ponds-data.php";
  url =
    url +
    "?id=3&sdate=" +
    sdate +
    "&edate=" +
    edate +
    "&amount=" +
    amount +
    "&bweight=" +
    beginweight +
    "&eweight=" +
    endweight;
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      FPCancel3();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FPEdit4() {
  document.getElementById("FPEdit4Btn").disabled = true;
  document.getElementById("FPSave4Btn").disabled = false;
  document.getElementById("FPCancel4Btn").disabled = false;

  document.getElementById("4_startdate").disabled = false;
  document.getElementById("4_enddate").disabled = false;
  document.getElementById("4_beginamount").disabled = false;
  document.getElementById("4_beginweight").disabled = false;
  document.getElementById("4_endweight").disabled = false;
}

function FPCancel4() {
  document.getElementById("FPEdit4Btn").disabled = false;
  document.getElementById("FPSave4Btn").disabled = true;
  document.getElementById("FPCancel4Btn").disabled = true;

  document.getElementById("4_startdate").disabled = true;
  document.getElementById("4_enddate").disabled = true;
  document.getElementById("4_beginamount").disabled = true;
  document.getElementById("4_beginweight").disabled = true;
  document.getElementById("4_endweight").disabled = true;

  Get4PondsInfo();
}

function FPSave4() {
  var sdate = document.getElementById("4_startdate").value;
  var edate = document.getElementById("4_enddate").value;
  var amount = document.getElementById("4_beginamount").value;
  var beginweight = document.getElementById("4_beginweight").value;
  var endweight = document.getElementById("4_endweight").value;

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-four-ponds-data.php";
  url =
    url +
    "?id=4&sdate=" +
    sdate +
    "&edate=" +
    edate +
    "&amount=" +
    amount +
    "&bweight=" +
    beginweight +
    "&eweight=" +
    endweight;
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      FPCancel4();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsResetProjectModal() {
  var auth = document.getElementById("ConfirmFourPondsResetTxt").value;
  const xhttp = new XMLHttpRequest();
  var url = "./php/check-phone-password.php?auth=" + auth;
  xhttp.onload = function () {
    if (this.responseText == "0") {
      FourPondsResetProject();
      document.getElementById("FourPondsResetErr").style.display = "none";
    } else {
      document.getElementById("FourPondsResetErr").style.display = "block";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsResetProject() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/reset-four-ponds.php";
  xhttp.onload = function () {
    //console.log(this.responseText);
    if (this.responseText == "0") {
      window.location.replace("./dashboard.html");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsCloseProjectModal() {
  var auth = document.getElementById("ConfirmFourPondsCloseTxt").value;
  const xhttp = new XMLHttpRequest();
  var url = "./php/check-phone-password.php?auth=" + auth;
  xhttp.onload = function () {
    if (this.responseText == "0") {
      FourPondsCloseProject();
      document.getElementById("FourPondsCloseErr").style.display = "none";
    } else {
      document.getElementById("FourPondsCloseErr").style.display = "block";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function FourPondsCloseProject() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/four-ponds-close-project.php";
  xhttp.onload = function () {
    //console.log(this.responseText);
    if (this.responseText == "0000") {
      FourPondsResetProject();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

$("#4PondsHistoryModal").on("show.bs.modal", function () {
  FourPondsGetHistory();
});

var FourPondsHistory;
function FourPondsGetHistory() {
  var txt = "";
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-count-close-project.php";
  xhttp.onload = function () {
    if (this.responseText != "1") {
      var data = JSON.parse(this.response);
      FourPondsHistory = data;
      drawFourPondsHistoryTable(data);
    } else {
      $("#four-ponds-history-table-tbody").empty();
      var row = $("<tr />");
      $("#four-ponds-history-table").append(row);
      row.append(
        $(
          "<td colspan='2' style='text-align:center;font-size: smaller'>?????????????????????????????????</td>"
        )
      );
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function drawFourPondsHistoryTable(data) {
  var count = Object.keys(data).length;

  $("#four-ponds-history-table-tbody").empty();
  for (var i = 0; i < count; i++) {
    if (data[i] != null) {
      drawFourPondsHistoryRow(data[i]);
    }
  }
}

function drawFourPondsHistoryRow(rowData) {
  var row = $("<tr />");
  $("#four-ponds-history-table").append(row);
  row.append(
    $(
      "<td style='text-align: left' onclick='LotDetailed(" +
        rowData.lot +
        ")'><a href='#' >Lot " +
        rowData.lot +
        "</a></td>"
    )
  );
  row.append(
    $(
      "<td style='text-align: center; width: 1%; cursor: pointer;'><a href='#' onclick='DeleteLot(" +
        rowData.lot +
        ")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
    )
  );
}

function LotDetailed(lot) {
  document.getElementById("LotTxt").innerHTML = lot;
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-lot-close-project.php?lot=" + lot;
  xhttp.onload = function () {
    if (this.responseText != "1") {
      var data = JSON.parse(this.response);
      document.getElementById("FPKeyTxt1").innerHTML = data[0].equipment_key;
      document.getElementById("FPSDateTxt1").innerHTML = data[0].start_date;
      document.getElementById("FPEDateTxt1").innerHTML = data[0].end_date;
      document.getElementById("FPAmountTxt1").innerHTML = data[0].fish_amount;
      document.getElementById("FPBWeightTxt1").innerHTML = data[0].begin_weight;
      document.getElementById("FPEWeightTxt1").innerHTML = data[0].end_weight;
      document.getElementById("FPPlusWeightTxt1").innerHTML =
        parseFloat(data[0].end_weight) - parseFloat(data[0].begin_weight);
      document.getElementById("FPFoodTxt1").innerHTML = data[0].food_used;
      document.getElementById("FPFCRTxt1").innerHTML = data[0].fcr;

      document.getElementById("FPKeyTxt2").innerHTML = data[1].equipment_key;
      document.getElementById("FPSDateTxt2").innerHTML = data[1].start_date;
      document.getElementById("FPEDateTxt2").innerHTML = data[1].end_date;
      document.getElementById("FPAmountTxt2").innerHTML = data[1].fish_amount;
      document.getElementById("FPBWeightTxt2").innerHTML = data[1].begin_weight;
      document.getElementById("FPEWeightTxt2").innerHTML = data[1].end_weight;
      document.getElementById("FPPlusWeightTxt2").innerHTML =
        parseFloat(data[1].end_weight) - parseFloat(data[1].begin_weight);
      document.getElementById("FPFoodTxt2").innerHTML = data[1].food_used;
      document.getElementById("FPFCRTxt2").innerHTML = data[1].fcr;

      document.getElementById("FPKeyTxt3").innerHTML = data[2].equipment_key;
      document.getElementById("FPSDateTxt3").innerHTML = data[2].start_date;
      document.getElementById("FPEDateTxt3").innerHTML = data[2].end_date;
      document.getElementById("FPAmountTxt3").innerHTML = data[2].fish_amount;
      document.getElementById("FPBWeightTxt3").innerHTML = data[2].begin_weight;
      document.getElementById("FPEWeightTxt3").innerHTML = data[2].end_weight;
      document.getElementById("FPPlusWeightTxt3").innerHTML =
        parseFloat(data[2].end_weight) - parseFloat(data[2].begin_weight);
      document.getElementById("FPFoodTxt3").innerHTML = data[2].food_used;
      document.getElementById("FPFCRTxt3").innerHTML = data[2].fcr;

      document.getElementById("FPKeyTxt4").innerHTML = data[3].equipment_key;
      document.getElementById("FPSDateTxt4").innerHTML = data[3].start_date;
      document.getElementById("FPEDateTxt4").innerHTML = data[3].end_date;
      document.getElementById("FPAmountTxt4").innerHTML = data[3].fish_amount;
      document.getElementById("FPBWeightTxt4").innerHTML = data[3].begin_weight;
      document.getElementById("FPEWeightTxt4").innerHTML = data[3].end_weight;
      document.getElementById("FPPlusWeightTxt4").innerHTML =
        parseFloat(data[3].end_weight) - parseFloat(data[3].begin_weight);
      document.getElementById("FPFoodTxt4").innerHTML = data[3].food_used;
      document.getElementById("FPFCRTxt4").innerHTML = data[3].fcr;
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
  $("#FourPondsLotDetailedModal").modal("show");
}

function DeleteLot(lot) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/delete-lot.php?lot=" + lot;
  xhttp.onload = function () {
    if (this.responseText == 0) {
      FourPondsGetHistory();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

