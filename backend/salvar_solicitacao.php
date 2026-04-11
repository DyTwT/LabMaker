<?php
require "conexao.php";

$nome = $_POST['nome'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$descricao = $_POST['descricao'] ?? '';
$nomeAnexo = null;

if (isset($_FILES['anexo']) && $_FILES['anexo']['error'] === UPLOAD_ERR_OK) {

    $arquivo = $_FILES['anexo'];

    if ($arquivo['size'] > 5 * 1024 * 1024) {
        die("Arquivo muito grande! Máx: 5MB.");
    }

    $extensoesPermitidas = ['jpg', 'jpeg', 'png', 'pdf'];
    $extensao = strtolower(pathinfo($arquivo['name'], PATHINFO_EXTENSION));

    if (!in_array($extensao, $extensoesPermitidas)) {
        die("Tipo de arquivo não permitido!");
    }

    $tiposPermitidos = [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $arquivo['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $tiposPermitidos)) {
        die("Arquivo inválido!");
    }

    $nomeSeguro = uniqid('anexo_', true) . '.' . $extensao;

    $diretorio = "../uploads/";
    if (!is_dir($diretorio)) {
        mkdir($diretorio, 0777, true);
    }

    if (!move_uploaded_file($arquivo['tmp_name'], $diretorio . $nomeSeguro)) {
        die("Erro ao salvar arquivo.");
    }

    $nomeAnexo = $nomeSeguro;
}

try {
    $sql = "INSERT INTO solicitacoes (nome, telefone, descricao, status, anexo, criado_em) 
            VALUES (?, ?, ?, 'Recebido', ?, NOW())";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $telefone, $descricao, $nomeAnexo]);

    echo "ok";

} catch (Exception $e) {
    echo "erro: " . $e->getMessage();
}