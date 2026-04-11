<?php
require "conexao.php";
header('Content-Type: application/json');
header('Content-Type: application/json');
ob_clean();

$action = $_GET['action'] ?? '';

try {
    if ($action === 'list') {
        $stmt = $pdo->query("SELECT * FROM slots ORDER BY data_slots DESC, horario ASC");
        echo json_encode($stmt->fetchAll());
    } 
    elseif ($action === 'add') {
        $stmt = $pdo->prepare("INSERT INTO slots (data_slots, horario, disponivel) VALUES (?, ?, 1)");
        $stmt->execute([$_POST['data'], $_POST['horario']]);
        echo json_encode(['success' => true]);
    } 
    elseif ($action === 'delete') {
        $stmt = $pdo->prepare("DELETE FROM slots WHERE id_slots = ?");
        $stmt->execute([$_POST['id']]);
        echo json_encode(['success' => true]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}