<?php
session_start();

// 读取 JSON 文件中的用户名和密码
$credentials = json_decode(file_get_contents('../credentials.json'), true);

$validUsername = $credentials['username'];
$validPassword = $credentials['password'];


if ($_POST['username'] == $validUsername && $_POST['password'] == $validPassword) {
    $_SESSION['loggedin'] = true;
    echo json_encode(['status' => 'success', 'message' => '登录成功']);
} else {
    echo json_encode(['status' => 'error', 'message' => '用户名或密码错误']);
}
?>
