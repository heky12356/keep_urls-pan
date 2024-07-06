// 发送 AJAX 请求到服务器端的 PHP 文件
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // 解析返回的 JSON 数据
            var data = JSON.parse(xhr.responseText);
            // 处理数据
            displayResults(data);
            displaySelect(data);
        } else {
            console.error('Request failed: ' + xhr.status);
        }
    }
};

xhr.open('GET', '../php/requireurl.php', true);
xhr.send();

// 显示结果
function displayResults(data) {
    // 创建一个字符串变量来存储 HTML 内容
    var html = '';
    // 先按照 dir 属性对数据进行排序
    var sortedData = data.slice().sort(function(a, b) {
        return a.option.localeCompare(b.option);
    });
    var currentCategory = ''; // 初始化为一个空字符串
    sortedData.forEach(function(row) {
        // 如果当前类别与之前的类别不同，则添加一个标题
        if (row.option !== currentCategory) {
            html += '<h2>' + row.option + '</h2>';
            currentCategory = row.option;
        }
        html += '<a href ="'+row.url+'">' + row.name + '</a></br>';
    });
    // 将 HTML 内容一次性添加到结果 div 中
    document.getElementById('results').innerHTML = html;
}

function displaySelect(data) {
    var html = '';
    var innerd = '';
    data.forEach(function(row) {
        if(innerd != row.option){
            html += '<option value="' + row.option + '">' + row.option + '</option>';
            innerd = row.option;
        }
    });
    document.getElementById('options').innerHTML = html;
}