<?php
session_start();

header("Content-Type: application/json");
require_once "conexao.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$senha = trim($data['senha'] ?? '');

if (!$email || !$senha) {
    echo json_encode(["success" => false, "message" => "Preencha todos os campos."]);
    exit;
}

// Busca usuário (incluindo o nome agora!)
$stmt = $pdo->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    // Salva dados na sessão
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['usuario_nome'] = $usuario['nome'];

    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "E-mail ou senha inválidos."]);
}
