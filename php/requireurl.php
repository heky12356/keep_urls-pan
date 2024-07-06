<?php
// 连接 SQLite 数据库
$db = new SQLite3('../db/urldb.db');

// 执行查询
$queryResult = $db->query('SELECT * FROM urls');

// 将结果转换为数组
$resultsArray = array();
while ($row = $queryResult->fetchArray(SQLITE3_ASSOC)) {
    $resultsArray[] = $row;
}

// 返回 JSON 格式的结果
header('Content-Type: application/json');
echo json_encode($resultsArray);
