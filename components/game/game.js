// game-btn part

var startBtn = document.getElementById('start-btn');
var endBtn = document.getElementById('end-btn');
var stopBtn = document.getElementById('stop-btn');
var resumeBtn = document.getElementById('resume-btn');

var GameStatus = {
    NotStart : 0,
    Running : 1,
    Stop : 2,
    End : 3
};

function placeButtonsByGameStatus(gameStatus) {
    switch(gameStatus){
        case GameStatus.NotStart:
            startBtn.style.display = 'flex';
            endBtn.style.display = 'none';
            stopBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            break;
        case GameStatus.Running:
            startBtn.style.display = 'none';
            endBtn.style.display = 'flex';
            stopBtn.style.display = 'flex';
            resumeBtn.style.display = 'none';
            break;
        case GameStatus.Stop:
            startBtn.style.display = 'none';
            endBtn.style.display = 'flex';
            stopBtn.style.display = 'none';
            resumeBtn.style.display = 'flex';
            break;
        case GameStatus.End:
            startBtn.style.display = 'flex';
            endBtn.style.display = 'none';
            stopBtn.style.display = 'none';
            resumeBtn.style.display = 'none';
            break;
        default:
            alert('Wrong GameStatus!');
    }
    
}

// game-canvas part

var canvas = document.getElementById('game-window');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var brickRow = 5;
var brickCol = 9;
var brickWidth;
var brickHeight;

var brickExist = new Array(brickRow);
var brickTop = new Array(brickRow);
var brickBottom = new Array(brickRow);
var brickLeft = new Array(brickRow);
var brickRight = new Array(brickRow);

for(let i = 0; i < brickRow; ++i) {
    brickExist[i] = new Array(brickCol);
    brickTop[i] = new Array(brickCol);
    brickBottom[i] = new Array(brickCol);
    brickLeft[i] = new Array(brickCol);
    brickRight[i] = new Array(brickCol);
    for(let j = 0; j < brickCol; ++j) {
        brickExist[i][j] = true;
    }
}

function placeBricks() {
    brickWidth = (canvasWidth - 2 * extMargin + margin) / brickCol - margin;
    brickHeight = (canvasHeight / 2 - 2 * extMargin + margin) / brickRow - margin;
    // console.log(brickWidth, brickHeight);
    ctx.fillStyle = themeColor;
    for(let i = 0; i < brickCol; ++i) {
        for(let j = 0; j < brickRow; ++j) {
            if(brickExist[j][i] == false) {
                continue;
            }
            brickTop[j][i] = extMargin + (margin + brickHeight) * j;
            brickBottom[j][i] = extMargin + (margin + brickHeight) * j + brickHeight;
            brickLeft[j][i] = extMargin + (margin + brickWidth) * i;
            brickRight[j][i] = extMargin + (margin + brickWidth) * i + brickWidth;
            ctx.fillRect(brickLeft[j][i], brickTop[j][i], brickWidth, brickHeight);
        }
    }
}

var extMargin = 40;

function clearBall(x, y, r) {
    ctx.fillStyle = ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, r + 1, 0, 2 * Math.PI, false);
    // 额外加一个像素才能完全擦掉之前的球？
    ctx.closePath();
    ctx.fill();
    placeBricks();
    ctx.fillRect(boardX, boardY, brickWidth, margin);
}

function drawBall(x, y, r) {
    ctx.fillStyle = themeColor;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

function judgeIntersect(x0, y0, x1, y1, y2, r) {
    var delta = Math.sqrt(r * r - (x1 - x0) * (x1 - x0));
    if(-(y1 - y0) - delta >= 0 && -(y1 - y0) - delta <= (y2 - y1)){
        return true;
    }
    if(-(y1 - y0) + delta >= 0 && -(y1 - y0) + delta <= (y2 - y1)){
        return true;
    }
    return false;
}

var positionX;
var positionY;
var velocityX;
var velocityY;
var gamePID;

function showTip(tip, offset) {
    ctx.fillStyle = themeColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = '114px Old English Text MT';
    ctx.fillStyle = 'white';
    ctx.fillText(tip, canvasWidth / 2 - offset, canvasHeight / 2 + 40);
}

var boardX;
var mouseX, mouseY;
var boardVelocity = 1000;
var boardY;
var margin = 8;
var boardPID;

function placeBoard(x) {
    boardX = x;
    boardY = canvasHeight - 2 * margin;
    ctx.fillStyle = themeColor;
    ctx.fillRect(boardX, boardY, brickWidth, margin);
    boardPID = setInterval(() => {
        if(mouseX < boardX + brickWidth / 2 - boardVelocity * 0.01) {
            var newBoardX = boardX - boardVelocity * 0.01;
            if(newBoardX < margin) {
                return;
            }
            ctx.clearRect(boardX - 1, canvasHeight - 2 * margin - 1, brickWidth + 2, margin + 2);
            ctx.fillStyle = themeColor;
            ctx.fillRect(newBoardX, boardY, brickWidth, margin);
            boardX = newBoardX;
        }
        else if(mouseX > boardX + brickWidth / 2 + boardVelocity * 0.01) {
            var newBoardX = boardX + boardVelocity * 0.01;
            if(newBoardX + brickWidth > canvasWidth - margin){
                return;
            }
            ctx.clearRect(boardX - 1, canvasHeight - 2 * margin - 1, brickWidth + 2, margin + 2);
            ctx.fillStyle = themeColor;
            ctx.fillRect(newBoardX, boardY, brickWidth, margin);
            boardX = newBoardX;
        }
    }, 10);
}

function placeBall(x, y, r, vx, vy) {
    positionX = x;
    positionY = y;
    velocityX = vx;
    velocityY = vy;
    drawBall(positionX, positionY, r);
    gamePID = setInterval(function() {
        var newPositionX = positionX + velocityX * 0.01;
        var newPositionY = positionY + velocityY * 0.01;
        clearBall(positionX, positionY, r);
        drawBall(newPositionX, newPositionY, r);
        positionX = newPositionX;
        positionY = newPositionY;
        if(positionX - r <= 0 || positionX + r >= canvasWidth) {
            velocityX *= -1;
        }
        if(positionY - r <= 0) {
            velocityY *= -1;
        }
        if(positionY - r >= canvasHeight) {
            clearInterval(gamePID);
            clearInterval(boardPID);
            showTip('You Lose', 228);
            startBtn.textContent = '再试一次';
            placeButtonsByGameStatus(GameStatus.End);
            return;
        }
        var brickCounter = 0;
        var xReverse = false;
        var yReverse = false;
        for(let i = 0; i < brickCol; ++i) {
            for(let j = 0; j < brickRow; ++j) {
                if(brickExist[j][i] == false){
                    brickCounter++;
                    continue;
                }
                
                var x0 = positionX, y0 = positionY;
                var x1 = brickLeft[j][i], y1 = brickTop[j][i];
                var x2 = brickRight[j][i], y2 = brickBottom[j][i];
                var isTouchLeft = (judgeIntersect(x0, y0, x1, y1, y2, r) && x0 < x1);
                var isTouchRight = (judgeIntersect(x0, y0, x2, y1, y2, r) && x2 < x0);
                var isTouchTop = (judgeIntersect(y0, x0, y1, x1, x2, r) && y0 < y1);
                var isTouchBottom = (judgeIntersect(y0, x0, y2, x1, x2, r) && y2 < y0);
                
                if(isTouchLeft) { // left
                    xReverse = true;
                    brickExist[j][i] = false;
                }
                if(isTouchRight) { // right
                    xReverse = true;
                    brickExist[j][i] = false;
                }
                if(isTouchTop) { // top
                    yReverse = true;
                    brickExist[j][i] = false;
                }
                if(isTouchBottom) { // bottom
                    yReverse = true;
                    brickExist[j][i] = false;
                }
                if(brickExist[j][i] == false) {
                    brickCounter++;
                    ctx.clearRect(brickLeft[j][i] - 1, brickTop[j][i] - 1, brickWidth + 2, brickHeight + 2);
                }
                
            }
        }
        if(xReverse){ // 防止双撞
            velocityX *= -1;
        }
        if(yReverse){
            velocityY *= -1;
        }
        
        var x0 = positionX, y0 = positionY;
        var x1 = boardX, y1 = boardY;
        var x2 = boardX + brickWidth, y2 = boardY + margin;
        xReverse = false;
        yReverse = false;

        if(judgeIntersect(x0, y0, x1, y1, y2, r) && x0 < x1) { // left
            xReverse = true;
        }
        if(judgeIntersect(x0, y0, x2, y1, y2, r) && x2 < x0) { // right
            xReverse = true;
        }
        if(judgeIntersect(y0, x0, y1, x1, x2, r) && y0 < y1) { // top
            yReverse = true;
        }/*
        if(judgeIntersect(y0, x0, y2, x1, x2, r)) { // bottom
            yReverse = true;
        }*/
        if(xReverse == true){ // 防止双撞，例如卡在板的两边之间的情况
            velocityX *= -1;
        }
        if(yReverse == true){
            velocityY *= -1;
        }

        if(brickCounter == brickCol * brickRow) {
            clearInterval(gamePID);
            clearInterval(boardPID);
            showTip('You Win', 223);
            startBtn.textContent = '再来一局';
            placeButtonsByGameStatus(GameStatus.End);
            return;
        }
    }, 10);
}

window.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    //console.log(x, y);
});

placeButtonsByGameStatus(GameStatus.NotStart);
showTip('Welcome', 200);


startBtn.addEventListener('click', function() {
    for(let i = 0; i < brickCol; ++i) {
        for(let j = 0; j < brickRow; ++j) {
            brickExist[j][i] = true;
        }
    }
    startBtn.disabled = true;
    startBtn.style.display = 'none';
    showTip('3', 30);
    setTimeout(() => {
        showTip('2', 30);
    }, 1000);

    setTimeout(() => {
        showTip('1', 30);
    }, 2000);

    setTimeout(() => {
        showTip('Go', 70);
    }, 3000);
    
    setTimeout(() => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        placeBricks();

        var vx = (Math.random() - 0.5) * 400 * Math.sqrt(2);
        placeBall(canvasWidth / 2, canvasHeight - 3 * margin - 1, margin, vx, -Math.sqrt(80000 - vx * vx));
        placeButtonsByGameStatus(GameStatus.Running);
        placeBoard(canvasWidth / 2);
        startBtn.textContent = '开始游戏';
        startBtn.disabled = false;
    }, 4000);
});

endBtn.addEventListener('click', function() {
    clearInterval(gamePID);
    clearInterval(boardPID);
    showTip('Game End', 250);
    startBtn.textContent = '重新开始';
    placeButtonsByGameStatus(GameStatus.NotStart);
});

stopBtn.addEventListener('click', function() {
    clearInterval(gamePID);
    clearInterval(boardPID);
    placeButtonsByGameStatus(GameStatus.Stop);
});

resumeBtn.addEventListener('click', function() {
    placeBoard(boardX);
    placeBall(positionX, positionY, margin, velocityX, velocityY);
    placeButtonsByGameStatus(GameStatus.Running);
})

