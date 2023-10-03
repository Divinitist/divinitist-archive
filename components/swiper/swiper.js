var leftButton = document.getElementById('left-btn');
var rightButton = document.getElementById('right-btn');

// transform都是从初始状态出发，不会叠加
var topImg = document.getElementById('top-img');
var frontImg = document.getElementById('front-img');
var bottomImg = document.getElementById('bottom-img');
var backImg = document.getElementById('back-img');
var leftImg = document.getElementById('left-img');
var rightImg = document.getElementById('right-img');

var autoRightId;

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

leftButton.style.transform = `translate3d(calc(-${halfImgWidth} - 6vw), 0, ${halfImgWidth})`;
rightButton.style.transform = `translate3d(calc(${halfImgWidth} + 6vw), 0, ${halfImgWidth})`;

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
    clearInterval(autoRightId);
    autoRightId = -114514;
    for(let i = 0; i < n; ++i) {
        swiperDots[i].disabled = true;
    }
}

function enableAllButtons() {
    leftButton.disabled = false;
    rightButton.disabled = false;
    if(autoRightId == -114514) {
        autoRightId = setInterval(autoRight, 2500);
    }
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
    if(swiperDots[idx].disabled == true || idx == curIdx) {
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
        }, 400);

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
        }, 400);

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

function autoRight() {
    if(rightButton.disabled == false){
        rightButton.onclick();
    }
}

leftButton.onclick = function() {
    if(leftButton.disabled == true){
        return;
    }
    hideImgList([topImg, backImg, bottomImg, rightImg]);
    frontImg.style.transform = rightPos;
    leftImg.style.transform = frontPos;
    rightImg.style.transform = backPos;
    backImg.style.transform = leftPos;
    
    disableAllButtons();
    setTimeout(() => {
        enableAllButtons();
    }, 400);

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
    if(rightButton.disabled == true){
        return;
    }
    hideImgList([topImg, backImg, bottomImg, leftImg]);
    frontImg.style.transform = leftPos;
    leftImg.style.transform = backPos;
    rightImg.style.transform = frontPos;
    backImg.style.transform = rightPos;
    
    disableAllButtons();
    setTimeout(() => {
        enableAllButtons();
    }, 400);

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

for(let i = 0; i < n; ++i) {
    var newDot = document.createElement('div');
    newDot.classList.add('swiper-dot');
    newDot.id = `dot${i}`;
/*
    var globWidth = window.screen.width;
    newDot.style.width = `calc(${globWidth}px / 250)`;
    newDot.style.height = newDot.style.width;
*/
    swiperDots.push(newDot);
    swiperDots[i].addEventListener('click', function() {
        jumpToImg(i);
    });
    swiperDotContainer.appendChild(newDot);
}

loadImg();
setDots();
putImgDiv();

autoRightId = setInterval(autoRight, 2500);