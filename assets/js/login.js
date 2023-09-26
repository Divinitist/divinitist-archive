loadComponents(['input', 'link', 'popup-window', 'press-button']);
var username = Array.from(document.getElementsByClassName('login-panel-input-username'))[0];
var password = Array.from(document.getElementsByClassName('login-panel-input-password'))[0];
var confirmPassword = Array.from(document.getElementsByClassName('login-panel-input-confirm-password'))[0];
var interfaceContainer = Array.from(document.getElementsByClassName('login-panel-interface-container'))[0];

function setLoginWindow() {
    setClassByName('login-panel-input-confirm-password-container', 'none');
    setClassByName('login-panel-button-signup', 'none');
    setClassByName('login-panel-button-login', 'flex');
    setClassByName('login-panel-tip-signup-container', 'flex');
    setClassByName('login-panel-tip-login-container', 'none');
    setClassByName('login-panel-tip-forget-container', 'flex');
    username.blur(0);
    password.blur(0);
    confirmPassword.blur(0);
    var tipContainer = Array.from(document.getElementsByClassName('login-panel-tip-container'))[0];
    tipContainer.style.flex = '1.5';
}

setLoginWindow();

function setSignupWindow() {
    setClassByName('login-panel-input-confirm-password-container', 'flex');
    setClassByName('login-panel-button-signup', 'flex');
    setClassByName('login-panel-button-login', 'none');
    setClassByName('login-panel-tip-signup-container', 'none');
    setClassByName('login-panel-tip-login-container', 'flex');
    setClassByName('login-panel-tip-forget-container', 'none');
    var tipContainer = Array.from(document.getElementsByClassName('login-panel-tip-container'))[0];
    username.blur(0);
    password.blur(0);
    confirmPassword.blur(0);
    tipContainer.style.flex = '0.5';
}

function login() {
    if(rgbToHex(window.getComputedStyle(username).color) == subTextColor || username.value == "") {
        showPopupWindow('提示', '请输入账号');
        return;
    }
    if(rgbToHex(window.getComputedStyle(password).color) == subTextColor || password.value == "") {
        showPopupWindow('提示', '请输入密码');
        return;
    }
    var intendedPassword = window.localStorage.getItem(username.value);
    if(intendedPassword == null) {
        showPopupWindow('错误', '账号不存在');
        return;
    }
    if(intendedPassword != password.value) {
        showPopupWindow('错误', '账号或密码错误');
        return;
    }
    window.localStorage.setItem('current-logging-on-user', username.value); // 名字超过20个字符，不可能是用户名
    window.location.href = '../../pages/main/main.html';
}

function signup() {
    if(rgbToHex(window.getComputedStyle(username).color) == subTextColor || username.value == "") {
        showPopupWindow('提示', '请输入账号');
        return;
    }
    if(rgbToHex(window.getComputedStyle(password).color) == subTextColor || password.value == "") {
        showPopupWindow('提示', '请输入密码');
        return;
    }
    if(rgbToHex(window.getComputedStyle(confirmPassword).color) == subTextColor || confirmPassword.value == "") {
        showPopupWindow('提示', '请确认密码');
        return;
    }
    var intendedPassword = window.localStorage.getItem(username.value);
    if(intendedPassword != null) {
        showPopupWindow('错误', '账号已存在');
        return;
    }
    if(password.value != confirmPassword.value) {
        showPopupWindow('错误', '两次密码输入不一致');
        return;
    }
    window.localStorage.setItem(username.value, password.value);
    showPopupWindow('提示', '账号注册成功，请登录');
    setLoginWindow();
}

function findPassword() {
    if(rgbToHex(window.getComputedStyle(username).color) == subTextColor || username.value == "") {
        showPopupWindow('提示', '请输入账号后再次点击找回');
        return;
    }
    var intendedPassword = window.localStorage.getItem(username.value);
    if(intendedPassword == null) {
        showPopupWindow('错误', '账号不存在');
        return;
    }
    window.localStorage.removeItem(username.value);
    showPopupWindow('提示', '原账号注销完成，可重新注册');
}