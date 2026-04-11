<?php
session_start();

if (!isset($_SESSION['administrador']) || $_SESSION['administrador'] !== true) {
    die("Acesso negado!");
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=labmaker_banco;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['acao']) && $_GET['acao'] == 'add_solicitacao') {
        $nome = $_POST['nome'];
        $telefone = $_POST['telefone'];
        $descricao = $_POST['descricao'];

        $sql = $pdo->prepare("INSERT INTO solicitacoes (nome, telefone, descricao, status, criado_em) VALUES (?, ?, ?, 'Recebido', NOW())");
        $sql->execute([$nome, $telefone, $descricao]);

        echo "ok";
        exit;
    }

    if (isset($_POST['acao']) && $_POST['acao'] == 'add_slot') {
        $data_slots = $_POST['data_slots'];
        $horario = $_POST['horario'];

        $sql = $pdo->prepare("INSERT INTO slots (data_slots, horario, disponivel) VALUES (?, ?, 1)");
        $sql->execute([$data_slots, $horario]);

        echo "ok";
        exit;
    }

    if (isset($_GET['listar_slots'])) {
        $sql = $pdo->query("SELECT * FROM slots ORDER BY data_slots, horario");
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    if (isset($_POST['acao']) && $_POST['acao'] == 'delete_slot') {
        $id = $_POST['id'];

        $sql = $pdo->prepare("DELETE FROM slots WHERE id_slots = ?");
        $sql->execute([$id]);

        echo "ok";
        exit;
    }

    if (isset($_GET['listar_solicitacoes'])) {
        $sql = $pdo->query("SELECT * FROM solicitacoes ORDER BY id_solicitacoes DESC");
        echo json_encode($sql->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    if (isset($_POST['acao']) && $_POST['acao'] == 'update_status') {
        $id = $_POST['id'];
        $status = $_POST['status'];

        $sql = $pdo->prepare("UPDATE solicitacoes SET status = ? WHERE id_solicitacoes = ?");
        $sql->execute([$status, $id]);

        echo "ok";
        exit;
    }

} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>