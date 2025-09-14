<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");
require_once "conexao.php"; // Certifique-se que este arquivo conecta ao seu banco corretamente

// Lê os dados JSON enviados pelo JS
$data = json_decode(file_get_contents("php://input"), true);

$nome = trim($data['nome'] ?? '');
$email = trim($data['email'] ?? '');
$senha = trim($data['senha'] ?? '');

// Verifica se os campos foram preenchidos
if (!$nome || !$email || !$senha) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    exit;
}

// Verifica se o e-mail já existe
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "E-mail já cadastrado."]);
    exit;
}

// Insere o novo usuário
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");

try {
    $stmt->execute([$nome, $email, $senhaHash]);
    echo json_encode(["success" => true, "message" => "Cadastro realizado com sucesso!"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Erro no banco: " . $e->getMessage()]);
}

