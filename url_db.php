<?php
    $db = new SQLite3('urldb.db');

    // 检查连接是否成功
    if (!$db) {
        die("连接失败: " . $db->lastErrorMsg());
    }
// 创建表的SQL语句
$createTableQuery = "
CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT  NOT NULL,
	name TEXT NOT NULL
)";

// 执行创建表的SQL语句
$result = $db->exec($createTableQuery);
if ($result === false) {
    die("创建表失败: " . $db->lastErrorMsg());
} else {
    echo "表创建成功";
}
    // 关闭数据库连接
    $db->close();

