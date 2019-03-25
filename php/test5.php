<table>
<tbody>
<?php
function avg($arr) {
$sum = 0;
foreach($arr as $val) {
$sum += $val;
}
return $sum/count($arr);
}

$array = array('科目/姓名'=>array('张', '王', '李', '赵', '周'),
'Math'=>array(80, 61, 59, 85, 76),
'C'=>array(75, 65, 63, 87, 77),
'English'=>array(92, 71, 70, 90, 85));

$keys = array_keys($array);
foreach($keys as $key) {
echo "<tr><td>".$key."</td>";
foreach($array[$key] as $val) {
echo "<td>".$val."</td>";
}
if ($key == "科目/姓名")
echo "<td>平均分</td>";
else
echo "<td>".avg($array[$key])."</td>";
echo "</tr>";
}

echo "<tr>";
echo "<td>总分</td>";
$len = count($array['Math']);
for ($i=0; $i<$len; $i++) {
$sum = $array['Math'][$i] + $array['C'][$i] + $array['English'][$i];
echo "<td>".$sum."</td>";
}
echo "</tr>";
?>
</tbody>
</table>