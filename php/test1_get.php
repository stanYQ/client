<?php
$top_width = $_POST["top_width"];
$bottom_width = $_POST["bottom_width"];
$hight = $_POST["hight"];

function caculateArea($top_width,$bottom_width,$hight){
    $s=($top_width+$bottom_width)*$hight/2;
    echo "梯形面积".$s;
}

caculateArea($top_width,$bottom_width,$hight);
?>