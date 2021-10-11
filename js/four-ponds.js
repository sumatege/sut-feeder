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
        if (data[0].p_fish_end_weight == 0) {
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
      //CheckAutomation();

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
          "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
        )
      );

      var row2 = $("<tr />");
      $("#bor-2-auto-table").append(row2);
      row2.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
        )
      );

      var row3 = $("<tr />");
      $("#bor-3-auto-table").append(row3);
      row3.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
        )
      );

      var row4 = $("<tr />");
      $("#bor-4-auto-table").append(row4);
      row4.append(
        $(
          "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
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
        "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
      )
    );
  }

  if (check2 == 1) {
    var row2 = $("<tr />");
    $("#bor-2-auto-table").append(row2);
    row2.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
      )
    );
  }

  if (check3 == 1) {
    var row3 = $("<tr />");
    $("#bor-3-auto-table").append(row3);
    row3.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
      )
    );
  }

  if (check4 == 1) {
    var row4 = $("<tr />");
    $("#bor-4-auto-table").append(row4);
    row4.append(
      $(
        "<td colspan='4' style='text-align:center;font-size: smaller'>ยังไม่มีการตั้งเวลาล่วงหน้า</td>"
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
          " " + utimeplus + " น. ถึง " + atimeplus + " น.";
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
