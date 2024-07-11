<?php
session_start();

// 假设用户名和密码存储在数据库或其他安全地方
$validUsername = 'user';
$validPassword = 'password';

if ($_POST['username'] == $validUsername && $_POST['password'] == $validPassword) {
    $_SESSION['loggedin'] = true;
    echo json_encode(['status' => 'success', 'message' => '登录成功']);
} else {
    echo json_encode(['status' => 'error', 'message' => '用户名或密码错误']);
}
?>
