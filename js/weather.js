var appid = "91800f1c7b349cfdb6620064c1a229a4";
var lat;
var long;
var weatherApi =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&lang=th";

var x = document.getElementById("latlong");

function getLocation() {
  document.getElementById("location-data").style.display = "block";
  setTimeout(function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }, 3000);
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
  lat = position.coords.latitude;
  long = position.coords.longitude;
  document.getElementById("location-data").style.display = "none";
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
    if (this.response == "0") {
      window.location.replace("./setup-project.php");
    } else {
      document.getElementById("failedStrat").innerHTML =
        "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function skip() {
  window.location.replace("./setup-project.php");
}
