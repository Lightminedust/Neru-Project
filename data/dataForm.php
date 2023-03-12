<?php
$data = json_decode(file_get_contents('php://input'), true);
$file = 'formdata.json';
$current = file_get_contents($file);
$current .= json_encode($data) . "\n";
file_put_contents($file, $current);
?>
<?php
$data = json_decode(file_get_contents('php://input'), true);
$file = 'data.json';
$current = file_get_contents($file);
$current .= json_encode($data) . "\n";
file_put_contents($file, $current);
?>
