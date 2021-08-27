<?php
session_start();

if(isset($_SESSION["selectedId"])){
    $data = array("selectedId" => $_SESSION["selectedId"], "selectedKey" => $_SESSION["selectedKey"], "selectedName" => $_SESSION["selectedName"], "selectedLatlon" => $_SESSION["selectedLatlon"]);
    echo json_encode($data);
}else{
    echo "1";
}

?>