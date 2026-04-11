<?php
require "conexao.php";
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM solicitacoes ORDER BY criado_em DESC");
    echo json_encode($stmt->fetchAll());
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>