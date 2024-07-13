<?php
// 禁用错误报告输出
error_reporting(0);
ini_set('display_errors', 0);

// 开启输出缓冲
ob_start();

// 设置响应头
header('Content-Type: application/json');

// 初始化调试信息数组
$debugInfo = [];

// 设置 SQLite 数据库文件路径
$db_path = '../db/urldb.db';

try {
    // 连接到 SQLite 数据库
    $pdo = new PDO("sqlite:$db_path");
    
    // 设置错误模式为异常
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 获取POST数据
    $oldName = $_POST['oldName'] ?? '';
    $oldUrl = $_POST['oldUrl'] ?? '';
    $oldCategory = $_POST['oldCategory'] ?? '';
    $newName = $_POST['newName'] ?? '';
    $newUrl = $_POST['newUrl'] ?? '';
    $newCategory = $_POST['newCategory'] ?? '';

    // 添加接收到的数据到调试信息
    $debugInfo['receivedData'] = [
        'oldName' => $oldName, 'oldUrl' => $oldUrl, 'oldCategory' => $oldCategory,
        'newName' => $newName, 'newUrl' => $newUrl, 'newCategory' => $newCategory
    ];

    // 准备SQL语句
    $stmt = $pdo->prepare("UPDATE urls SET name = :newName, url = :newUrl, option = :newCategory WHERE name = :oldName AND url = :oldUrl AND option = :oldCategory");
    
    // 添加SQL查询到调试信息
    $debugInfo['sqlQuery'] = $stmt->queryString;

    // 绑定参数并执行
    $stmt->execute([
        ':newName' => $newName,
        ':newUrl' => $newUrl,
        ':newCategory' => $newCategory,
        ':oldName' => $oldName,
        ':oldUrl' => $oldUrl,
        ':oldCategory' => $oldCategory
    ]);

    // 检查是否有记录被更新
    if ($stmt->rowCount() > 0) {
        $response = ['success' => true];
    } else {
        $response = ['success' => false, 'message' => '没有找到匹配的记录或没有变化'];
    }

} catch(PDOException $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
    $debugInfo['error'] = $e->getMessage();
}

// 在正式环境中，您可能想要注释掉这一行
$response['debug'] = $debugInfo;

// 清除之前的输出缓冲
ob_clean();

// 输出 JSON 响应
echo json_encode($response);
exit;
?>