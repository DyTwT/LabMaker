<?php
header('Content-Type: application/json');

include("conexao.php");

$sql = "SELECT * FROM slots WHERE disponivel = 1";
$result = $conn->query($sql);

$dados = [];

while($row = $result->fetch_assoc()) {
    $dados[] = [
        "type" => "slot",
        "date" => $row["data_slots"],
        "time_slot" => substr($row["horario"], 0, 5),
        "slot_available" => true
    ];
}

echo json_encode($dados);
?>