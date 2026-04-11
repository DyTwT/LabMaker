<?php
require "conexao.php";
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("
        SELECT * FROM agendamentos 
        ORDER BY data_agendamentos DESC, horario_agendamentos ASC
    ");

    echo json_encode($stmt->fetchAll());

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}