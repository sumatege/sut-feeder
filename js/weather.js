var appid = "91800f1c7b349cfdb6620064c1a229a4";
var lat;
var long;
var weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&lang=th";

var x = document.getElementById("latlong");

function getLocation() {
  document.getElementById("failedStrat").style.display = "none";
  x.style.display = "none";
  document.getElementById("location-data").style.display = "block";
  setTimeout(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }, 2000);
}

function showPosition(position) {
  x.innerHTML = "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  x.style.display = "block";
  lat = position.coords.latitude;
  long = position.coords.longitude;
  document.getElementById("location-data").style.display = "none";
  document.getElementById("BtnStart").disabled = false;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred.";
      break;
  }
}

function SaveLocation() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/save-location.php";
  url = url + "?lat=" + lat + "&long=" + long;
  xhttp.onload = function () {
    console.log(this.responseText);
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

function skip() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/set-greeting.php";
  xhttp.onload = function () {
    window.location.replace("./dashboard.html");
  };
  xhttp.open("GET", url);
  xhttp.send();
}
