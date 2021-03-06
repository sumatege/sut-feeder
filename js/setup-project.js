var food_unit;

function SetupProject() {
  document.getElementById("btn-g").style.border = "medium solid #1C319F";
  document.getElementById("btn-g").style.background = "white";
  document.getElementById("btn-g").style.opacity = "1";
  document.getElementById("btn-g").style.color = "black";
  food_unit = "g";
}

function skip() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/set-greeting.php";
  xhttp.onload = function () {
    window.location.replace("./dashboard.html");
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SaveProject() {
  var key = document.getElementById("key").value;
  var name = document.getElementById("name").value;
  var weight = document.getElementById("begin_weight").value;
  var amount = document.getElementById("fish_amout").value;

  if (food_unit == "g") {
    weight = parseFloat(weight) / 1000;
  }

  //alert(key + " " + name + " " + weight + " " + amount);

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
    //alert(url);
    xhttp.onload = function () {
      //alert(this.response);
      if (this.responseText == 0) {
        window.location.replace("./setup-location.html");
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

function ChangeUnit(val) {
  if (val == "g") {
    document.getElementById("btn-g").style.border = "medium solid #1C319F";
    document.getElementById("btn-g").style.background = "white";
    document.getElementById("btn-g").style.opacity = "1";
    document.getElementById("btn-g").style.color = "black";

    document.getElementById("btn-kg").style.border = "none";
    document.getElementById("btn-kg").style.opacity = "0.5";
    document.getElementById("btn-kg").style.color = "gray";

    document.getElementById("UnitTxt").innerHTML = "กรัม";
    food_unit = "g";
  } else {
    document.getElementById("btn-kg").style.border = "medium solid #1C319F";
    document.getElementById("btn-kg").style.background = "white";
    document.getElementById("btn-kg").style.opacity = "1";
    document.getElementById("btn-kg").style.color = "black";

    document.getElementById("btn-g").style.border = "none";
    document.getElementById("btn-g").style.opacity = "0.5";
    document.getElementById("btn-g").style.color = "gray";

    document.getElementById("UnitTxt").innerHTML = "กิโลกรัม";
    food_unit = "kg";
  }
}
