<?php
require "conexao.php";

$data = $_GET['data'] ?? null;

if ($data) {
    $stmt = $pdo->prepare("SELECT * FROM slots WHERE data_slots = ? AND disponivel = 1 ORDER BY horario ASC");
    $stmt->execute([$data]);
} else {
    $stmt = $pdo->query("SELECT * FROM slots WHERE disponivel = 1 ORDER BY data_slots, horario ASC");
}

echo json_encode($stmt->fetchAll());