

function showPopupWindow(title, message) {
    var popupWindowContainer = document.createElement('div');
    popupWindowContainer.classList.add('login-panel-popup-window-container')
    popupWindowContainer.classList.add('component-popup-window-container');
    body.appendChild(popupWindowContainer);

    var popupWindow = document.createElement('div');
    popupWindow.classList.add('login-panel-popup-window')
    popupWindow.classList.add('component-popup-window');
    popupWindowContainer.appendChild(popupWindow);

    var windowTitleContainer = document.createElement('div');
    windowTitleContainer.classList.add('login-panel-popup-window-title-container');
    windowTitleContainer.classList.add('component-popup-window-title-container');
    popupWindow.appendChild(windowTitleContainer);

    var windowTitle = document.createElement('span');
    windowTitle.classList.add('login-panel-popup-window-title')
    windowTitle.classList.add('component-popup-window-title');
    windowTitle.textContent = title;
    windowTitle.style.color = "white";
    windowTitleContainer.appendChild(windowTitle);

    var windowMessage = document.createElement('span');
    windowMessage.classList.add('login-panel-popup-window-message')
    windowMessage.classList.add('component-popup-window-message');
    windowMessage.textContent = message;
    windowMessage.color = mainTextColor;
    popupWindow.appendChild(windowMessage);

    var windowButton = document.createElement('button');
    windowButton.classList.add('login-panel-popup-window-button')
    windowButton.classList.add('component-popup-window-button')
    windowButton.classList.add('component-press-button');
    windowButton.type = 'button';
    windowButton.textContent = '确认';
    windowButton.onclick = hidePopupWindow; // 带括号的会直接执行然后把结果返回给onclick，不能这么写
    popupWindow.appendChild(windowButton);
}

function hidePopupWindow() {
    var popupWindowContainer = this.parentNode.parentNode;
    body.removeChild(popupWindowContainer);
}