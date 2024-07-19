<?php
session_start();

// 连接到数据库
$db_path = '../db/urldb.db';
$pdo = new PDO("sqlite:$db_path");

// 获取所有唯一的分类
$stmt = $pdo->query("SELECT DISTINCT option FROM urls ORDER BY option");
$categories = $stmt->fetchAll(PDO::FETCH_COLUMN);

// 创建分类选项的 HTML
$categoryOptions = '';
foreach ($categories as $category) {
    $categoryOptions .= "<option value=\"" . htmlspecialchars($category) . "\">";
}

$neitng = '<form action="./php/enurl.php" method="post">
                <label for="options">分类：  </label>
                <input list="options" id="selectedOption" name="option">
                <datalist id="options">
                    ' . $categoryOptions . '
                </datalist>
                <p></p>
                <label for="name">链接标题：</label>
                <input type="text" id="name" name="name" required>
                <p></p>
                <label for="url">链接网址：</label>
                <input type="text" id="url" name="url" required>
                <p></p>
                <button type="submit" name="enurl">添加</button>
            </form>';
$neitng2 = '<button id="delete-button">删除</button>
            <button id="edit-button">编辑</button>
            <button id="save-button" style="display: none;">保存</button>
';

$guanlifenlei = '<div class="toggle" >
                     <button id="manage-categories-btn" onclick = "opendropModal()">管理分类</button>
                </div>
';

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    echo json_encode(['status' => 'success', 'content' => $neitng, 'content2' => $neitng2, 'fenleiguanli' => $guanlifenlei]);
} else {
    echo json_encode(['status' => 'error', 'message' => '未登录']);
}
?>