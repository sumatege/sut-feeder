function skip() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/set-greeting.php";
  xhttp.onload = function () {
    window.location.replace("./dashboard.php");
  };
  xhttp.open("GET", url);
  xhttp.send();
}
