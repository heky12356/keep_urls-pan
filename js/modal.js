function openModal(element) {
    // 获取与图标相邻的链接元素
    const linkElement = element.nextElementSibling;

    // 获取链接文本和 href 值
    const linkText = linkElement.textContent;
    const linkHref = linkElement.getAttribute('href');

    // 获取分类（从 data-category 属性中获取）
    const category = element.closest('.urlcontainer').getAttribute('data-category') || '未分类';

    // 更新模态框内容
    const modalTextElement = document.getElementById('modal-text');
    const modalUrlElement = document.getElementById('modal-url');
    const modalCategoryElement = document.getElementById('modal-category');

    if (modalTextElement) modalTextElement.innerText = linkText;
    if (modalUrlElement) modalUrlElement.innerText = linkHref;
    if (modalCategoryElement) modalCategoryElement.innerText = category;

    // 显示模态框
    const modalElement = document.getElementById('modal');
    if (modalElement) modalElement.style.display = 'flex';

    // 重置按钮状态
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    if (editButton) editButton.style.display = 'inline-block';
    if (saveButton) saveButton.style.display = 'none';

    // 添加删除按钮的事件监听器
    const deleteButton = document.getElementById('delete-button');
    if (deleteButton) {
        deleteButton.onclick = function() {
            deleteRecord(linkText, linkHref, category);
        };
    }

    // 添加编辑按钮的事件监听器
    if (editButton) {
        editButton.onclick = function() {
            enableEditing(linkText, linkHref, category);
        };
    }
}


function enableEditing(name, url, category) {
    document.getElementById('modal-text').innerHTML = `<input type="text" id="edit-name" value="${name}">`;
    document.getElementById('modal-url').innerHTML = `<input type="text" id="edit-url" value="${url}">`;
    document.getElementById('modal-category').innerHTML = `<input type="text" id="edit-category" value="${category}">`;
    
    document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline-block';

    // 更新保存按钮的事件监听器
    document.getElementById('save-button').onclick = function() {
        saveChanges(name, url, category);
    };
}

function saveChanges(oldName, oldUrl, oldCategory) {
    const newName = document.getElementById('edit-name').value;
    const newUrl = document.getElementById('edit-url').value;
    const newCategory = document.getElementById('edit-category').value;

    updateRecord(oldName, oldUrl, oldCategory, newName, newUrl, newCategory);
}

function updateRecord(oldName, oldUrl, oldCategory, newName, newUrl, newCategory) {
    console.log("Attempting to update - Old Name:", oldName, "Old URL:", oldUrl, "Old Category:", oldCategory);
    console.log("New values - Name:", newName, "URL:", newUrl, "Category:", newCategory);
    
    const formData = new FormData();
    formData.append('oldName', oldName);
    formData.append('oldUrl', oldUrl);
    formData.append('oldCategory', oldCategory);
    formData.append('newName', newName);
    formData.append('newUrl', newUrl);
    formData.append('newCategory', newCategory);

    fetch('./php/update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
        
        if (data.success) {
            alert('记录更新成功');
            closeModal();
            location.reload();
        } else {
            alert('更新失败: ' + (data.message || '未知错误'));
        }
        
        if (data.debug) {
            console.log("Debug info:", data.debug);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('发生错误，请查看控制台');
    });
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
    document.getElementById('modal').style.display = 'none' ;
       // 重置模态框内容
       document.getElementById('modal-text').innerText = '';
       document.getElementById('modal-url').innerText = '';
       document.getElementById('modal-category').innerText = '';
       // 重置按钮状态
       document.getElementById('edit-button').style.display = 'inline-block';
       document.getElementById('save-button').style.display = 'none';
}
