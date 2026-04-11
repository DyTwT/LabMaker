<?php
session_start();
header('Content-Type: application/json');

$res = [
    'logado' => isset($_SESSION['usuario_id']),
    'administrador' => isset($_SESSION['administrador']) && $_SESSION['administrador'] === true
];

echo json_encode($res);