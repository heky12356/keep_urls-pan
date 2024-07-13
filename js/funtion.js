// 发送 AJAX 请求到服务器端的 PHP 文件
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            // 解析返回的 JSON 数据
            var data = JSON.parse(xhr.responseText);
            // 处理数据
            displayResults(data);
        } else {
            console.error('Request failed: ' + xhr.status);
        }
    }
};

xhr.open('GET', './php/requireurl.php', true);
xhr.send();

// 显示结果
function displayResults(data) {
    var html = '';
    var sortedData = data.slice().sort(function(a, b) {
        return a.option.localeCompare(b.option);
    });
    var currentCategory = '';
    sortedData.forEach(function(row, index) {
        if (row.option !== currentCategory) {
            if (currentCategory !== '') {
                html += '</div>'; // 关闭上一个分类的容器
            }
            html += `<div class="category-header">
                        <h1>${row.option}</h1>
                        <button class="toggle-btn" onclick="toggleCategory(this)">-</button>
                     </div>`;
            html += `<div class="category-container" data-category="${row.option}">`;
            currentCategory = row.option;
        }
        html += `<div class="urlcontainer" data-name="${row.name}" data-url="${row.url}" data-category="${row.option}">`;
        html += '<a class="urltap"></a>';
        html += '<a class="icon" onclick="openModal(this)"></a>';
        html += `<a href="${row.url}" target="_blank">${row.name}</a><br>`;
        html += '</div>';
        html += '<p></p>';
    });
    html += '</div>'; // 关闭最后一个分类的容器
    document.getElementById('results').innerHTML = html;
}


function toggleCategory(button) {
    const categoryContainer = button.closest('.category-header').nextElementSibling;
    if (categoryContainer.style.display === 'none') {
        categoryContainer.style.display = 'block';
        button.textContent = '-';
    } else {
        categoryContainer.style.display = 'none';
        button.textContent = '+';
    }
}

// 展开、折叠所有按钮

document.addEventListener('DOMContentLoaded', function() {
    const toggleAllButton = document.getElementById('toggleAll');
    if (toggleAllButton) {
        toggleAllButton.addEventListener('click', function() {
            const containers = document.querySelectorAll('.category-container');
            const buttons = document.querySelectorAll('.toggle-btn');
            const allHidden = Array.from(containers).every(container => container.style.display === 'none');

            containers.forEach(container => {
                container.style.display = allHidden ? 'block' : 'none';
            });
            buttons.forEach(button => {
                button.textContent = allHidden ? '-' : '+';
            });
        });
    } else {
        console.error('Toggle all button not found');
    }
});