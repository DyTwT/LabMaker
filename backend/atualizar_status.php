<?php
require "conexao.php";

$id = $_POST['id'] ?? null;
$novoStatus = $_POST['status'] ?? null; // 'Análise', 'Fazendo', 'Concluído'

if ($id && $novoStatus) {
    $stmt = $pdo->prepare("UPDATE solicitacoes SET status = ? WHERE id_solicitacoes = ?");
    if ($stmt->execute([$novoStatus, $id])) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}