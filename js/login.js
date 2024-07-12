function login() {
    var form = document.getElementById('loginForm');
    var formData = new FormData(form);

    fetch('./php/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            loadProtectedContent();
        } else {
            alert(data.message);
        }
    });
}

function loadProtectedContent() {
    fetch('./php/protected_content.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            var protectedContent = document.getElementById('protectedContent');
            var deleteContent = document.getElementById('deleteContent');
            var login = document.getElementById('login');
            protectedContent.innerHTML = data.content;
            deleteContent.innerHTML = data.content2;
            protectedContent.style.display = 'block';
            login.style.display = 'none';

            // 执行插入的脚本
            var scripts = protectedContent.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerText);
            }
        } else {
            alert(data.message);
        }
    });
}

// 页面加载时检查登录状态
window.onload = function() {
    fetch('./php/check_login.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'loggedin') {
            loadProtectedContent();

        }
    });
}