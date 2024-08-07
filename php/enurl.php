<?php
// 检查是否通过 POST 方法提交数据
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['enurl'])) {
    // 使用 $_POST 获取表单数据
    $url = $_POST["url"];
    $name = $_POST["name"];
    $option = $_POST["option"];
    // $txt = file_get_contents($url);

    // 保存到数据库
try {
    // 连接到 SQLite 数据库（SQLite 数据库文件路径）
    $pdo = new PDO('sqlite:../db/urldb.db');

    // 设置 PDO 错误模式为异常
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 使用预处理语句
    $stmt = $pdo->prepare("INSERT INTO urls (url,name,option) VALUES (?,?,?)");

    // 绑定参数
    $stmt->bindParam(1, $url);
    $stmt->bindParam(2, $name);
    $stmt->bindParam(3, $option);
    // 执行预处理语句
    $stmt->execute();

    echo "数据插入成功！";
    header('Location: ../index.html');
} catch (PDOException $e) {
    echo "错误: " . $e->getMessage();
    // header('Location: ./index.html');
}

    // 关闭数据库连接
$pdo = null;} else {
    // 如果不是通过 POST 方法提交的数据，进行适当的处理
    echo "请通过表单提交数据";
    // header('Location: ./index.html');
}