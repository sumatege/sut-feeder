var myTimer;
var c = 0;

function BeforeStartFeeding() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-automation-table.php";
  xhttp.onload = function () {
    if (this.response != 1) {
      $("#AskManualFeedingModal").modal("show");
    } else {
      StartFeeding();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function StartFeeding() {
  $("#AskManualFeedingModal").modal("hide");
  MachineControl("0");
  var foodsize = document.getElementById("foodsize").value;
  document.getElementById("mstopfeed").disabled = false;
  document.getElementById("mstopfeed").style.opacity = "1";
  document.getElementById("mstartfeed").disabled = true;
  document.getElementById("mstartfeed").style.opacity = "0.1";
  document.getElementById("mclearfeed").disabled = false;
  document.getElementById("msavefeed").disabled = false;
  document.getElementById("foodsize").disabled = true;
  document.getElementById("mclearfeed").disabled = true;
  document.getElementById("mclearfeed").style.opacity = "0.1";
  document.getElementById("msavefeed").disabled = true;
  document.getElementById("msavefeed").style.opacity = "0.1";
  document.getElementById("self_weight").disabled = true;
  myTimer = setInterval(myClock, 1000);

  function myClock() {
    c = c + 1;
    document.getElementById("UsedFoodTime").value = c;

    if (foodsize == 0) {
      var weightpersec = document.getElementById("self_weight").value;
      CalculateFoodNewSize(c, weightpersec);
    } else {
      CalculateFood(c, foodsize);
    }

    //console.log(c);
    if (c == 59) {
      clearInterval(myTimer);
      alert("Reached 60 sec.");
      c = 0;
    }
  }
}

function StopFeeding() {
  MachineControl("1");
  clearInterval(myTimer);
  document.getElementById("mstartfeed").disabled = false;
  document.getElementById("mstartfeed").style.opacity = "1";
  document.getElementById("mstopfeed").disabled = true;
  document.getElementById("mstopfeed").style.opacity = "0.1";
  document.getElementById("mclearfeed").disabled = false;
  document.getElementById("mclearfeed").style.opacity = "1";
  document.getElementById("msavefeed").disabled = false;
  document.getElementById("msavefeed").style.opacity = "1";
}

function ClearFeeding() {
  clearInterval(myTimer);
  c = 0;
  document.getElementById("UsedFoodG").value = 0;
  document.getElementById("UsedFoodK").value = 0;
  document.getElementById("UsedFoodTime").value = 0;
  document.getElementById("mstartfeed").disabled = false;
  document.getElementById("mstartfeed").style.opacity = "1";
  document.getElementById("mstopfeed").disabled = true;
  document.getElementById("mstopfeed").style.opacity = "0.1";
  document.getElementById("foodsize").disabled = false;
  document.getElementById("mclearfeed").disabled = true;
  document.getElementById("mclearfeed").style.opacity = "0.1";
  document.getElementById("msavefeed").disabled = true;
  document.getElementById("msavefeed").style.opacity = "0.1";
  document.getElementById("self_weight").disabled = false;
  $("#CancelFeedingModal").modal("hide");
}

function SaveFeeding() {
  clearInterval(myTimer);
  c = 0;

  var foodsize = document.getElementById("foodsize").value;
  var totaltime = document.getElementById("UsedFoodTime").value;
  var usedfood = document.getElementById("UsedFoodG").value;

  const format1 = "YYYY-MM-DD HH:mm:ss";
  var date1 = new Date();
  dateTime1 = moment(date1).format(format1);
  let today = dateTime1;

  var url = "./php/save-record.php";
  url =
    url +
    "?foodsize=" +
    foodsize +
    "&totaltime=" +
    totaltime +
    "&usedfood=" +
    usedfood +
    "&datetime=" +
    today;
    //alert(url);
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    //alert(this.response);
    if (this.responseText == "0") {
      document.getElementById("UsedFoodG").value = 0;
      document.getElementById("UsedFoodK").value = 0;
      document.getElementById("UsedFoodTime").value = 0;
      document.getElementById("mstartfeed").disabled = false;
      document.getElementById("mstartfeed").style.opacity = "1";
      document.getElementById("mstopfeed").disabled = true;
      document.getElementById("mstopfeed").style.opacity = "0.1";
      document.getElementById("foodsize").disabled = false;
      document.getElementById("mclearfeed").disabled = true;
      document.getElementById("mclearfeed").style.opacity = "0.1";
      document.getElementById("msavefeed").disabled = true;
      document.getElementById("msavefeed").style.opacity = "0.1";
      $("#SaveFeedingModal").modal("hide");
      $("#SaveSuccessModal").modal("show");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function MachineControl(status) {
  var url = "./php/machine-control.php";

  if (status == "0") {
    url = url + "?status=0";
  } else {
    url = url + "?status=1";
  }
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {};
  xhttp.open("GET", url);
  xhttp.send();
}

function MachineStatus() {
  var status;
  var url = "./php/get-project-data.php";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.response != "1") {
      var data = JSON.parse(this.response);
      if (data.p_machine_status == 0) {
        status = "<img src='./images/icons/status-on.gif'> [ทำงาน]";
      } else {
        status = "<img src='./images/icons/status-off.png'> [หยุด]";
      }
      document.getElementById("mastatus").innerHTML = status;
    } else {
      document.getElementById("mastatus").innerHTML = "ไม่พบอุปกรณ์";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();

  setTimeout(MachineStatus, 1000);
}

function CalculateFood(usetime, foodsize) {
  const getJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
  };
  getJSON("./files/foodsize.txt").then(function (data) {
    data.forEach(function (item) {
      if (item.time == usetime) {
        switch (foodsize) {
          case "1":
            document.getElementById("UsedFoodG").value = item.oneg;
            document.getElementById("UsedFoodK").value = item.onek;
            break;
          case "2":
            document.getElementById("UsedFoodG").value = item.twog;
            document.getElementById("UsedFoodK").value = item.twok;
            break;
          case "5":
            document.getElementById("UsedFoodG").value = item.fiveg;
            document.getElementById("UsedFoodK").value = item.fivek;
            break;
          default:
            break;
        }
      }
    });
  });
}

function CalculateFoodNewSize(usetime, foodsize) {
  var unit = $('.UnitTextFeedingManual').html();

  //console.log(unit);
  if (unit == "กรัม") {    
    document.getElementById("UsedFoodG").value =
      usetime * (parseFloat(foodsize));
      document.getElementById("UsedFoodK").value = usetime * (parseFloat(foodsize) / 1000);
  } else {
    document.getElementById("UsedFoodG").value =
      usetime * (parseFloat(foodsize) * 1000);
      document.getElementById("UsedFoodK").value = usetime * (parseFloat(foodsize));
  }
}
