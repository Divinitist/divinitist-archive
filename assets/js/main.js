loadComponents(['input', 'link', 'popup-window', 'press-button', 'navigator']);


function showUserInfo() {
    var userInfoPanelContainer = document.createElement('div');
    userInfoPanelContainer.classList.add('top-navigator-user-panel-container');
    userInfoPanelContainer.classList.add('component-navigator-user-panel-container');
    userInfoPanelContainer.onmouseleave = hideUserInfo;
    body.appendChild(userInfoPanelContainer);

    var userInfoPanel = document.createElement('div');
    userInfoPanel.classList.add('top-navigator-user-panel');
    userInfoPanel.classList.add('component-navigator-user-panel');
    userInfoPanelContainer.appendChild(userInfoPanel);

    var userInfo = document.createElement('div');
    userInfo.classList.add('top-navigator-user-info');
    userInfo.classList.add('component-navigator-user-info');
    var currentUser = window.localStorage.getItem('current-logging-on-user');
    userInfo.textContent = '当前用户：' + (currentUser == null ? '未知用户' : currentUser);
    userInfoPanel.appendChild(userInfo);

    var logoutButton = document.createElement('button');
    logoutButton.classList.add('top-navigator-user-logout-button');
    logoutButton.classList.add('component-press-button');
    logoutButton.classList.add('component-navigator-user-logout-button');
    logoutButton.textContent = '退出登录';
    logoutButton.onclick = logout;
    userInfoPanel.appendChild(logoutButton);
}

function hideUserInfo() {
    var userInfoPanel = this.firstChild;
    if(userInfoPanel.classList.contains('removed') == false){
        userInfoPanel.classList.add('removed'); // 用添加className与transition配合使用
        userInfoPanel.addEventListener('transitionend', function(){
            this.parentNode.remove();
        });
    }
    // userInfoPanel.addEventListener('transitionend', body.removeChild(this)); 居然不一样！！为什么？？
}

function logout() {
    window.localStorage.removeItem('current-logging-on-user');
    window.location.href = '../../pages/login/login.html';
}