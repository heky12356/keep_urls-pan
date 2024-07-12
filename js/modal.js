function openModal(element) {
    // 获取与图标相邻的链接元素
    const linkElement = element.nextElementSibling;

    // 获取链接文本和 href 值
    const linkText = linkElement.textContent;
    const linkHref = linkElement.getAttribute('href');

    // 获取分类（假设分类是最近的 h1 元素）
    let categoryElement = element.closest('.urlcontainer').previousElementSibling;
    while (categoryElement && categoryElement.tagName !== 'H1') {
        categoryElement = categoryElement.previousElementSibling;
    }
    const category = categoryElement ? categoryElement.textContent : '未分类';

    // 更新模态框内容
    document.getElementById('modal-text').innerText = linkText;
    document.getElementById('modal-url').innerText = linkHref;
    document.getElementById('modal-category').innerText = category;

    // 显示模态框
    document.getElementById('modal').style.display = 'flex';

    // 添加删除按钮的事件监听器
    document.getElementById('delete-button').onclick = function() {
        deleteRecord(linkText, linkHref, category);
    };

}

function deleteRecord(name, url, category) {
    console.log("Attempting to delete - Name:", name, "URL:", url, "Category:", category);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('url', url);
    formData.append('category', category);

    fetch('./php/delete.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);  // 记录完整的服务器响应
        
        if (data.success) {
            alert('记录删除成功');
            closeModal();
            location.reload();
        } else {
            alert('删除失败: ' + (data.message || '未知错误'));
        }
        
        // 如果存在调试信息，在控制台输出
        if (data.debug) {
            console.log("Debug info:", data.debug);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('发生错误，请查看控制台');
    });
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}