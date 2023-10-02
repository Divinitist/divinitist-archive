

var leftButton = document.getElementById('left-btn');
var rightButton = document.getElementById('right-btn');

// transform都是从初始状态出发，不会叠加
var topImg = document.getElementById('top-img');
var frontImg = document.getElementById('front-img');
var bottomImg = document.getElementById('bottom-img');
var backImg = document.getElementById('back-img');
var leftImg = document.getElementById('left-img');
var rightImg = document.getElementById('right-img');

var imgPrefix = '../../assets/images/';
var imgList = ['assassins-creed-2.jpg', 'dark-souls-3.jfif', 'death-stranding.jpg', 'for-honor.jfif', 'hitman-3.jpg', 'mirrors-edge-2.jpg', 'sekiro.jfif', 'skyrim.jfif', 'tomb-raider.jfif', 'sherlock-holmes-crimes-and-punishments.webp'];
var curIdx = 0;

var halfImgWidth = '20vw';
var halfImgHeight = '11.25vw';
var n = imgList.length;

var topPos = `rotateX(-90deg) translate3d(0, calc(-${halfImgWidth} + ${halfImgHeight}), ${halfImgHeight})`;
var frontPos = `rotateY(0deg) translateZ(${halfImgWidth})`;
var bottomPos = `rotateX(90deg) translate3d(0, calc(${halfImgWidth} - ${halfImgHeight}), ${halfImgHeight})`;
var backPos = `scale(0.1) rotateY(-180deg) translateZ(${halfImgWidth})`;
var leftPos = `rotateY(-90deg) translateZ(${halfImgWidth})`;
var rightPos = `rotateY(90deg) translateZ(${halfImgWidth})`;

var swiperDotContainer = document.getElementById('swiper-dot-container');
var swiperDots = [];

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
        userInfoPanel.addEventListener('transitionend', function() {
            this.parentNode.remove();
        });
    }
    // userInfoPanel.addEventListener('transitionend', body.removeChild(this)); 居然不一样！！为什么？？
}

function logout() {
    window.localStorage.removeItem('current-logging-on-user');
    window.location.href = '../../pages/login/login.html';
}

function setDots() {
    for(let i = 0; i < n; ++i) {
        if(i == curIdx) {
            swiperDots[i].classList.add('ondisplay');
        }
        else if(swiperDots[i].classList.contains('ondisplay') == true) {
            swiperDots[i].classList.remove('ondisplay');
        }
    }
}

function loadImg() { // 每次装载只用管左中右这三张，后不用管，上下要用的时候生成
    frontImg.style.backgroundImage = `url('${imgPrefix}${imgList[curIdx]}')`;
    leftImg.style.backgroundImage = `url('${imgPrefix}${imgList[(curIdx + n - 1) % n]}')`;
    rightImg.style.backgroundImage = `url('${imgPrefix}${imgList[(curIdx + 1) % n]}')`;
}

function putImgDiv() {
    topImg.style.transform = topPos;
    frontImg.style.transform = frontPos;
    bottomImg.style.transform = bottomPos;
    backImg.style.transform = backPos;
    leftImg.style.transform = leftPos;
    rightImg.style.transform = rightPos;

    topImg.style.zIndex = '114';
    bottomImg.style.zIndex = '114';
    backImg.style.zIndex = '114';
    leftImg.style.zIndex = '114';
    rightImg.style.zIndex = '114';
    frontImg.style.zIndex = '514';
}

function disableAllButtons() {
    leftButton.disabled = true;
    rightButton.disabled = true;
    for(let i = 0; i < n; ++i) {
        swiperDots[i].disabled = true;
    }
}

function enableAllButtons() {
    leftButton.disabled = false;
    rightButton.disabled = false;
    for(let i = 0; i < n; ++i) {
        swiperDots[i].disabled = false;
    }
}

function hideImgList(imgList) {
    for(const i in imgList) {
        imgList[i].style.display = 'none';
    }
    setTimeout(() => {
        for(const i in imgList) {
            imgList[i].style.display = 'flex';
        }
    }, 400);
}

function jumpToImg(idx) {
    if(idx == curIdx) {
        return;
    }
    if(idx > curIdx) {
        if(idx == (curIdx + 1) % n) {
            rightButton.onclick();
            return;
        }
        
        hideImgList([bottomImg, backImg, leftImg, rightImg]);
        topImg.style.backgroundImage = `url(${imgPrefix}${imgList[idx]})`;
        topImg.style.transform = frontPos;
        frontImg.style.transform = bottomPos;
        bottomImg.style.transform = backPos;
        backImg.style.transform = topPos;

        disableAllButtons();
        setTimeout(() => {
            enableAllButtons();
        }, 500);

        var tmp = frontImg;
        frontImg = topImg;
        topImg = backImg;
        backImg = bottomImg;
        bottomImg = tmp;
    }
    if(idx < curIdx) {
        if(idx == (curIdx + n - 1) % n) {
            leftButton.onclick();
            return;
        }
        
        hideImgList([topImg, backImg, leftImg, rightImg]);
        topImg.style.backgroundImage = `url(${imgPrefix}${imgList[idx]})`;
        topImg.style.transform = backPos;
        backImg.style.transform = bottomPos;
        bottomImg.style.transform = frontPos;
        frontImg.style.transform = topPos;

        disableAllButtons();
        setTimeout(() => {
            enableAllButtons();
        }, 500);

        var tmp = backImg;
        backImg = topImg;
        topImg = frontImg;
        frontImg = bottomImg;
        bottomImg = tmp;
    }
    
    setTimeout(() => {
        putImgDiv();
    }, 300);
    
    curIdx = idx;
    loadImg();
    setDots();
}

// executing part

loadComponents(['input', 'link', 'popup-window', 'press-button', 'navigator', 'swiper']);

Array.from(document.getElementsByClassName('top-navigator-user'))[0].addEventListener('mouseenter', function() {
    showUserInfo();
});

for(let i = 0; i < n; ++i) {
    var newDot = document.createElement('div');
    newDot.classList.add('swiper-dot');
    newDot.id = `dot${i}`;

    swiperDots.push(newDot);
    swiperDots[i].addEventListener('click', function() {
        jumpToImg(i);
    });
    swiperDotContainer.appendChild(newDot);
}

leftButton.style.transform = `translate3d(calc(-${halfImgWidth} - 6vw), 0, ${halfImgWidth})`;
rightButton.style.transform = `translate3d(calc(${halfImgWidth} + 6vw), 0, ${halfImgWidth})`;

loadImg();
setDots();
putImgDiv();
/*
setInterval(() => {
    if(rightButton.disabled == false){
        rightButton.onclick();
    }
}, 2500);
*/
leftButton.onclick = function() {
    hideImgList([topImg, backImg, bottomImg, rightImg]);
    frontImg.style.transform = rightPos;
    leftImg.style.transform = frontPos;
    rightImg.style.transform = backPos;
    backImg.style.transform = leftPos;
    
    disableAllButtons();
    setTimeout(() => {
        enableAllButtons();
    }, 500);

    var tmp = frontImg;
    frontImg = leftImg;
    leftImg = backImg;
    backImg = rightImg;
    rightImg = tmp;

    setTimeout(() => {
        putImgDiv();
    }, 300);

    curIdx = (curIdx + n - 1) % n;
    loadImg();
    setDots();
}


rightButton.onclick = function() {
    hideImgList([topImg, backImg, bottomImg, leftImg]);
    frontImg.style.transform = leftPos;
    leftImg.style.transform = backPos;
    rightImg.style.transform = frontPos;
    backImg.style.transform = rightPos;
    
    disableAllButtons();
    setTimeout(() => {
        enableAllButtons();
    }, 500);

    setTimeout(() => {
        putImgDiv();
    }, 300);

    var tmp = frontImg;
    frontImg = rightImg;
    rightImg = backImg;
    backImg = leftImg;
    leftImg = tmp;

    curIdx = (curIdx + 1) % n;
    loadImg();
    setDots();
}

