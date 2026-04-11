<?php
session_start();
require "conexao.php";

$action = $_POST['action'] ?? 'login'; 
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

if ($action === 'cadastro') {
    $nome = $_POST['nome'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    try {
        $check = $pdo->prepare("SELECT id_usuarios FROM usuarios WHERE email = ?");
        $check->execute([$email]);
        if ($check->fetch()) { die("Este e-mail já está cadastrado!"); }

        $sql = "INSERT INTO usuarios (nome_completo, email, telefone, senha) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        if ($stmt->execute([$nome, $email, $telefone, $senha])) { echo "success_cadastro"; }
    } catch (PDOException $e) { echo "Erro: " . $e->getMessage(); }
    exit;
}

if ($action === 'login') {
    $stmt = $pdo->prepare("SELECT * FROM administrador WHERE email_administrador = ?");
    $stmt->execute([$email]);
    $adm = $stmt->fetch();

    if ($adm && $senha === $adm['senha_administrador']) {
        $_SESSION['usuario_id'] = $adm['id_administrador'];
        $_SESSION['user_type'] = 'admin';
        $_SESSION['administrador'] = true;
        echo "success_adm";
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && $senha === $user['senha']) {
        $_SESSION['usuario_id'] = $user['id_usuarios'];
        $_SESSION['user_type'] = 'user';
        $_SESSION['administrador'] = false;
        echo "success_user";
        exit;
    }
    echo "Email ou senha incorretos!";
}