<?php
$array = array();
echo '您输入的成绩有:<br>';
for ($i=1; $i<6; $i++) {
$score = $_POST['score'.$i];
echo $score."<br>";
if ($score < 60) {
array_push($array, $score);
}
}

echo "低于60分的成绩有:<br>";
foreach($array as $val) {
echo $val."<br>";
}
?>