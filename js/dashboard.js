var fullname;

function dashboard() {
  startTime();
  member();
}

function member() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-member.php";
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    if (this.response != "0") {
      document.getElementById("user-fullname").innerHTML =
        data.m_name + " " + data.m_sirname + " [รหัสผู้ใช้: " + data.m_id + "]";
      document.getElementById("user-name").innerHTML =
        data.m_name + " " + data.m_sirname;
      document.getElementById("user-email").innerHTML = data.m_email;
      document.getElementById("user-create-date").innerHTML =
        data.m_create_date;
      document.getElementById("user-latlong").innerHTML = data.m_latlong;
      document.getElementById("user-id").innerHTML = data.m_id;

      //getWeather(data.m_latlong);
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

function getWeather(latlong) {
  var latlong = latlong.split(",");
  var sep_lat = latlong[0];
  var sep_long = latlong[1];

  var url = weatherApi + "&lat=" + sep_lat + "&lon=" + sep_long;

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    var cel = parseFloat(data.main.temp) - 273.15;
    document.getElementById("weatherTxt").innerHTML =
      data.weather[0].description;
    document.getElementById("celsiusTxt").innerHTML = cel.toFixed(2);
  };
  xhttp.open("GET", url);
  xhttp.send();

  //setTimeout(getWeather, 60000);
}

function greeting(name) {
  document.getElementById("user-greeting").innerHTML = name;
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-greeting.php";
  xhttp.onload = function () {
    if (this.response == "0") {
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
