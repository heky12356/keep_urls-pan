// dropurl.js

// document.addEventListener('DOMContentLoaded', function() {
//     const dropcategories = document.getElementById('manage-categories-btn');
//     if (dropcategories) {
//         dropcategories.addEventListener('click', opendropModal);
//     } else {
//         console.error('管理分类按钮未找到');
//     }
// });

// 打开模态框函数
function opendropModal() {
    // 从服务器获取分类和链接数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                displayCategories(data);
            } else {
                console.error('请求失败: ' + xhr.status);
            }
        }
    };

    xhr.open('GET', './php/requireurl.php', true);
    xhr.send();
}

function displayCategories(data) {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    var sortedData = data.slice().map(function(item) {
        item.option = item.option || "未分类";
        return item;
    }).sort(function(a, b) {
        return a.option.localeCompare(b.option);
    });

    var currentCategory = '';
    sortedData.forEach(function(row) {
        if (row.option !== currentCategory) {
            if (currentCategory !== '') {
                categoriesContainer.innerHTML += '</div>'; // 关闭上一个分类的容器
            }
            categoriesContainer.innerHTML += `<div class="category" data-category="${row.option}">
                                                  <h3>${row.option}</h3>
                                                  <div class="links-container" ondragover="handleDragOver(event)" ondrop="handleDrop(event)"></div>`;
            currentCategory = row.option;
        }
        categoriesContainer.querySelector(`[data-category="${row.option}"] .links-container`).innerHTML += `
            <div class="link" draggable="true" data-name="${row.name}" data-url="${row.url}" data-category="${row.option}" data-original-category="${row.option}" ondragstart="handleDragStart(event)">
                ${row.name}
            </div>`;
    });
    categoriesContainer.innerHTML += '</div>'; // 关闭最后一个分类的容器

    document.getElementById('edit-category-modal').style.display = 'flex';
}

// 关闭模态框函数
function closedropModal() {
    document.getElementById('edit-category-modal').style.display = 'none';
}


let draggedElement = null;

// 拖动开始事件处理函数
function handleDragStart(event) {
    draggedElement = event.target;
}

// 拖动悬停事件处理函数
function handleDragOver(event) {
    event.preventDefault();
}

// 拖放事件处理函数
function handleDrop(event) {
    event.preventDefault();
    if (event.target.classList.contains('links-container')) {
        event.target.appendChild(draggedElement);
    } else if (event.target.classList.contains('link')) {
        event.target.closest('.links-container').appendChild(draggedElement);
    }
}

// 保存更改函数
function DropsaveChanges() {
    const categoriesContainer = document.getElementById('categories-container');
    const categories = Array.from(categoriesContainer.querySelectorAll('.category'));

    categories.forEach(category => {
        const categoryName = category.getAttribute('data-category');
        const links = Array.from(category.querySelectorAll('.link')).forEach(link => {
            const originalCategory = link.getAttribute('data-original-category');
            if (categoryName !== originalCategory) {
                var formData = new FormData();
                formData.append('oldName', link.getAttribute('data-name'));
                formData.append('oldUrl', link.getAttribute('data-url'));
                formData.append('oldCategory', originalCategory);
                formData.append('newName', link.getAttribute('data-name'));
                formData.append('newUrl', link.getAttribute('data-url'));
                formData.append('newCategory', categoryName);

                fetch('./php/update.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (!data.success) {
                        console.error(`更新失败: ${data.message} (链接: ${link.getAttribute('data-name')}, URL: ${link.getAttribute('data-url')}, 新分类: ${categoryName})`);
                    }
                })
                .catch(error => {
                    console.error('错误:', error);
                });
            }
        });
    });

    alert('更改已保存');
    closedropModal();
    location.reload();
}
