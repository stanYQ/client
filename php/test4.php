<?php
$array = [1, 7, 9, 14, 19, 11];
rsort($array);
echo "最小数: ".$array[count($array) - 1]."<br>";
echo "最大数: ".$array[0];
?>