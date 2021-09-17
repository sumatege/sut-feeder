var project_status;

function admin() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-session.php";
  xhttp.onload = function () {
    if (this.responseText == "2") {
      project_status = 9;
      SetSelected(project_status);
      $("#AdminModalInclude").load("admin-modal.html");
    } else {
      window.location.replace("./dashboard.html");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

var TopBtn = document.getElementById("TopBtn");

window.onscroll = function() {scrollFunction()};

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

function GetTable() {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-all-project.php";
  xhttp.onload = function () {
    var recorddata = JSON.parse(this.response);
    if (recorddata != 1) {
      drawTable(recorddata);
    } else {
      $("#tbody-project").empty();
      var row = $("<tr />");
      $("#table-project").append(row);
      row.append(
        $(
          "<td colspan='17' style='text-align:center;font-size: smaller'>ไม่พบข้อมูล</td>"
        )
      );
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

var row_number;
function drawTable(data) {
  row_number = 1;
  var count = Object.keys(data).length;

  $("#tbody-project").empty();
  for (var i = 0; i < count; i++) {
    if (data[i] != null) {
      if (project_status == 9) {
        drawRow(data[i], row_number);
        row_number += 1;
      } else if (project_status == data[i].p_status) {
        drawRow(data[i], row_number);
        row_number += 1;
      }
    }
  }
}
//rowData.a_feeding_time.substring(0, 5)
function drawRow(rowData, index) {
  var ma_status = "";
  var owner = "";
  var last_weight;

  //alert(rowData.p_status);
  switch (rowData.p_status) {
    case "0":
      ma_status = "รหัสใหม่";
      break;
    case "1":
      ma_status = "ขายแล้ว";
      break;
    case "2":
      ma_status = "รหัสใช้แล้ว";
      break;
    default:
      break;
  }

  if (rowData.p_owner == null) {
    owner = "<td>" + rowData.p_owner + "</td>";
  } else {
    owner =
      "<td><a href='#' onclick='EditMember(\"" +
      rowData.p_owner +
      "\")'>" +
      rowData.p_owner +
      "</a></td>";
  }

  if (rowData.p_fish_end_weight != 0) {
    last_weight = parseFloat(
      rowData.p_fish_end_weight - rowData.p_fish_begin_weight
    );
  } else {
    last_weight = null;
  }

  var row = $("<tr />");
  $("#table-project").append(row);
  row.append($("<td>" + index + "</td>"));
  row.append(
    $(
      "<td><a href='#' onclick='EditProject(" +
        rowData.p_id +
        ")'>" +
        rowData.p_id +
        "</a></td>"
    )
  );
  row.append($("<td>" + rowData.p_key + "</td>"));
  row.append($("<td>" + rowData.p_name + "</td>"));
  row.append($(owner));
  row.append($("<td>" + rowData.m_name + "</td>"));
  row.append($("<td>" + rowData.m_sirname + "</td>"));
  row.append($("<td>" + rowData.p_start_date + "</td>"));
  row.append($("<td>" + rowData.p_end_date + "</td>"));
  row.append($("<td>" + rowData.p_fish_amount + "</td>"));
  row.append($("<td>" + rowData.p_fish_begin_weight + "</td>"));
  row.append($("<td>" + rowData.p_fish_end_weight + "</td>"));
  row.append($("<td>" + last_weight + "</td>"));
  row.append(
    $("<td>" + parseFloat(rowData.p_food_used / 1000).toFixed(2) + "</td>")
  );
  row.append($("<td>" + rowData.p_fcr + "</td>"));
  row.append($("<td>" + ma_status + "</td>"));
  row.append(
    $(
      "<td><a href='#' onclick='DeleteProject(\"" +
        rowData.p_key +
        "\")'><i class='fa fa-trash' aria-hidden='true'></i></a></td>"
    )
  );
}

function SetSelected(val) {
  project_status = val;
  GetTable();

  if (val == 9) {
    $(".btn-9").removeClass("unselected-btn");
    $(".btn-0").addClass("unselected-btn");
    $(".btn-1").addClass("unselected-btn");
    $(".btn-2").addClass("unselected-btn");
  } else if (val == 0) {
    $(".btn-9").addClass("unselected-btn");
    $(".btn-0").removeClass("unselected-btn");
    $(".btn-1").addClass("unselected-btn");
    $(".btn-2").addClass("unselected-btn");
  } else if (val == 1) {
    $(".btn-9").addClass("unselected-btn");
    $(".btn-0").addClass("unselected-btn");
    $(".btn-1").removeClass("unselected-btn");
    $(".btn-2").addClass("unselected-btn");
  } else if (val == 2) {
    $(".btn-9").addClass("unselected-btn");
    $(".btn-0").addClass("unselected-btn");
    $(".btn-1").addClass("unselected-btn");
    $(".btn-2").removeClass("unselected-btn");
  }
}

function SearchText() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search-text");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-project");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td0 = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    td3 = tr[i].getElementsByTagName("td")[3];
    td4 = tr[i].getElementsByTagName("td")[4];
    td5 = tr[i].getElementsByTagName("td")[5];
    td6 = tr[i].getElementsByTagName("td")[6];
    if (td0 || td1 || td2 || td3 || td4 || td5 || td6) {
      txtValue0 = td0.textContent || td0.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      txtValue5 = td5.textContent || td5.innerText;
      txtValue6 = td6.textContent || td6.innerText;
      if (
        txtValue0.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1 ||
        txtValue5.toUpperCase().indexOf(filter) > -1 ||
        txtValue6.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } else {
    }
  }
}

function ExportData() {
  var tab_text = "<table border='1px'><tr>";
  var textRange;
  var j = 0;
  var i = 0;
  tab = document.getElementById("table-project"); // id of table
  for (j = 0; j < tab.rows.length; j++) {
    //tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
    for (i = 0; i < tab.rows[0].cells.length; i++) {
      if (i == 1) {
        tab_text =
          tab_text + "<td>" + tab.rows[j].cells[i].textContent + "</td>";
      }
      if (i == 4) {
        tab_text =
          tab_text + "<td>" + tab.rows[j].cells[i].textContent + "</td>";
      }
      if (i < 14 && i != 1 && i != 4) {
        tab_text = tab_text + "<td>" + tab.rows[j].cells[i].innerHTML + "</td>";
      }
    }
    tab_text = tab_text + "</tr>";
    //tab_text=tab_text+"</tr>";
  }

  tab_text = tab_text + "</table>";

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer
    txtArea1.document.open("txt/html", "replace");
    txtArea1.document.write(tab_text);
    txtArea1.document.close();
    txtArea1.focus();
    sa = txtArea1.document.execCommand(
      "SaveAs",
      true,
      "Say Thanks to Sumit.xls"
    );
  } //other browser not tested on IE 11
  else
    sa = window.open(
      "data:application/vnd.ms-excel," + encodeURIComponent(tab_text)
    );

  return sa;
}

function AddNewID() {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const xhttp = new XMLHttpRequest();
  var url = "./php/check-key.php?key=" + result;
  xhttp.onload = function () {
    if (this.response == "1") {
      document.getElementById("equipment-id").innerHTML = result;
      $("#NewIDModal").modal("show");
    } else {
      AddNewID();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SaveNewID() {
  var key = document.getElementById("equipment-id").innerHTML;
  const xhttp = new XMLHttpRequest();
  var url = "./php/add-new-key.php?key=" + key;
  xhttp.onload = function () {
    if (this.response == "0") {
      var showid = document.getElementById("equipment-id").innerHTML;
      document.getElementById("show-id").innerHTML = showid;
      $("#NewIDModal").modal("hide");
      $("#SaveNewIDSuccessModal").modal("show");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function RefreshPage() {
  window.location.replace("./admin.html");
}

function DeleteProject(key) {
  document.getElementById("delete-key").innerHTML = key;
  $("#DeleteKeyModal").modal("show");
}

function ConfirmDeleteProject() {
  var key = document.getElementById("delete-key").innerHTML;
  const xhttp = new XMLHttpRequest();
  var url = "./php/delete-key.php?key=" + key;
  xhttp.onload = function () {
    if (this.response == "0") {
      $("#DeleteKeyModal").modal("hide");
      RefreshPage();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function EditMember(mid) {
  var key = document.getElementById("delete-key").innerHTML;
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-member-data.php?id=" + mid;
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    //console.log(data);
    if (this.responseText != "1") {
      $("#m_id").val(data.m_id);
      $("#m_name").val(data.m_name);
      $("#m_sirname").val(data.m_sirname);
      $("#m_phone").val(data.m_phone);
      $("#m_create_date").val(data.m_create_date);
      $("#MemberModal").modal("show");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SaveEditMember() {
  var id = $("#m_id").val();
  var name = $("#m_name").val();
  var sirname = $("#m_sirname").val();
  var phone = $("#m_phone").val();

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-edit-member.php";
  url =
    url +
    "?id=" +
    id +
    "&name=" +
    name +
    "&sirname=" +
    sirname +
    "&phone=" +
    phone;
  xhttp.onload = function () {
    if (this.responseText == "0") {
      $("#MemberModal").modal("hide");
      RefreshPage();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function EditProject(id) {
  const xhttp = new XMLHttpRequest();
  var url = "./php/get-selected-project.php?id=" + id;
  xhttp.onload = function () {
    var data = JSON.parse(this.response);
    //console.log(data);
    if (data != 1) {
      $("#p_id").val(data.p_id);
      $("#p_key").val(data.p_key);
      $("#p_name").val(data.p_name);
      $("#p_owner").val(data.m_id);
      $("#p_mname").val(data.m_name + " " + data.m_sirname);
      $("#p_sdate").val(data.p_start_date);
      $("#p_edate").val(data.p_end_date);
      $("#p_famount").val(data.p_fish_amount);
      $("#p_fbweight").val(data.p_fish_begin_weight);
      $("#p_feweight").val(data.p_fish_end_weight);
      if (data.p_fish_end_weight != 0) {
        $("#p_fpweight").val(
          parseFloat(data.p_fish_end_weight - data.p_fish_begin_weight)
        );
      } else {
        $("#p_fpweight").val("0");
      }
      $("#p_food").val(parseFloat(data.p_food_used / 1000));
      $("#p_fcr").val(data.p_fcr);
      $("#p_status").val(data.p_status);
      $("#ProjectModal").modal("show");
    } else {
      $("#NodataExportModal").modal("show");
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function SaveEditProject() {
  var id = document.getElementById("p_id").value;
  var name = document.getElementById("p_name").value;
  var owner = document.getElementById("p_owner").value;
  var sdate = document.getElementById("p_sdate").value;
  var edate = document.getElementById("p_edate").value;
  var amount = document.getElementById("p_famount").value;
  var bweight = document.getElementById("p_fbweight").value;
  var eweight = document.getElementById("p_feweight").value;
  var food = document.getElementById("p_food").value;
  var fcr = document.getElementById("p_fcr").value;
  var status = document.getElementById("p_status").value;

  food = food * 1000;

  const xhttp = new XMLHttpRequest();
  var url = "./php/save-edit-project.php";
  url =
    url +
    "?id=" +
    id +
    "&name=" +
    name +
    "&owner=" +
    owner +
    "&sdate=" +
    sdate +
    "&edate=" +
    edate +
    "&amount=" +
    amount +
    "&bweight=" +
    bweight +
    "&eweight=" +
    eweight +
    "&food=" +
    food +
    "&fcr=" +
    fcr +
    "&status=" +
    status;
  //console.log(url);
  xhttp.onload = function () {
    if (this.responseText == "0") {
      $("#ProjectModal").modal("hide");
      RefreshPage();
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}
