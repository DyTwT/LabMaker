<?php
require "conexao.php";

$nome = $_POST['nome'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$pessoas = $_POST['quantidade_pessoas'] ?? '';
$data = $_POST['data'] ?? '';
$horario = $_POST['horario'] ?? '';

try {
    $pdo->beginTransaction();

    $sql = "INSERT INTO agendamentos (nome_agendamentos, telefone, pessoas, data_agendamentos, horario_agendamentos, status, criado_em)
            VALUES (?, ?, ?, ?, ?, 'Recebido', NOW())";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $telefone, $pessoas, $data, $horario]);

    $update = "UPDATE slots SET disponivel = 0 WHERE data_slots = ? AND horario = ?";
    $stmtUpdate = $pdo->prepare($update);
    $stmtUpdate->execute([$data, $horario]);

    $pdo->commit();
    echo "ok";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "erro: " . $e->getMessage();
}