<?php
function main($n, $i) {
if ($i > 1) {
$n = 2 * $n + 2;
return main($n, $i - 1);
}
return $n;
}
echo main(1, 10);
?>