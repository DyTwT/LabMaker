<?php
include "conexao.php";

$id_slots = $_POST['id_slots'];

$sql = "DELETE FROM slots WHERE id_slots=$id_slots";
$conn->query($sql);

echo "ok";
?>