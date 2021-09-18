<?php
date_default_timezone_set('Asia/Bangkok');

echo "normal = " . date("Y-m-d H:i:s") . "<br>";
$newTime = date("Y-m-d H:i:s",strtotime(date("Y-m-d H:i:s")." +7 hours"));

echo "+7 = " . $newTime . "<br>";