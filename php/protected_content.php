<?php
session_start();

$neitng = '<form action="./php/enurl.php" method="post">
                <label for="options">分类：  </label>
                <input list="options" id="selectedOption" name="option">
                <datalist id="options"></datalist>
                <p></p>
                <label for="name">链接标题：</label>
                <input type="text" id="name" name="name" required>
                <p></p>
                <label for="url">链接网址：</label>
                <input type="text" id="url" name="url" required>
                <p></p>
                <button type="submit" name="enurl">添加</button>
            </form>';
$neitng2 = '<button id="delete-button">删除</button>';
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    echo json_encode(['status' => 'success', 'content' => $neitng,'content2' => $neitng2]);
} else {
    echo json_encode(['status' => 'error', 'message' => '未登录']);
}
?>
