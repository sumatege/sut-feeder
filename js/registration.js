(function ($) {
  "use strict";

  /*==================================================================
    [ Focus Contact2 ]*/
  $(".input100").each(function () {
    $(this).on("blur", function () {
      if ($(this).val().trim() != "") {
        $(this).addClass("has-val");
      } else {
        $(this).removeClass("has-val");
      }
    });
  });

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("name") == "phone") {
      if (
        $(input)
          .val()
          .trim()
          .match(/^\d{10}$/) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);

function GetSession() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-session.php";
  xhttp.onload = function () {
    if (this.responseText == "0") {
      window.location.replace("./dashboard.html");
    } else if (this.responseText == "2") {
      window.location.replace("./admin.html");
    } else {
      CheckFailed();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function CheckFailed() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-cookie.php";
  xhttp.onload = function () {
    if (this.responseText != "1") {
      document.getElementById("RegisFailedText").innerHTML = this.responseText;
    } else {
      document.getElementById("RegisFailedText").innerHTML = "";
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}
