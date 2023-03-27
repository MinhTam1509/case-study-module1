// tạo bảng
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// đầu con rắn
var snakeX = blockSize * 5;
var snakeY = blockSize * 7;

// di chuyển của rắn theo trục X, Y
var velocityX = 0;
var velocityY = 0;

// thân con rắn
var snakeBody = [];

// thức ăn của rắn
var foodX; //blockSize * 13;
var foodY; //blockSize * 10;

// điểm số
var score = 0;

// thua trò chơi
var gameOver = false;


window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d');
    placeFood();
    document.addEventListener('keyup', changeDirection);
    // update();
    setInterval(update, 80); // set tốc độ di chuyển rắn
    // requestAnimationFrame(update);
}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = 'black'; // màu bảng
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red'; // màu thức ăn
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        // ăn đồ ăn
        snakeBody.push([foodX, foodY])
        score++;
        placeFood();
        count();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]; // in ra thân rắn
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]; // thân rắn
    }


    context.fillStyle = 'lime'; // màu rắn
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // setup chạy xuyên tường
    // if (snakeX > cols * blockSize) {
    //     snakeX = 0;
    // } 
    // if (snakeX < 0 ) {
    //     snakeX = cols * blockSize;
    // }
    // if (snakeY > rows * blockSize) {
    //     snakeY = 0;
    // }
    // if (snakeY < 0 ) {
    //     snakeY = rows * blockSize;
    // }

    // setup để thua game
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        // đụng cạnh tường ---> thua
        gameOver = true;
        alert('Bạn thua mất rồi, nhấn ok để chơi lại nhé');
        document.location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // đụng thân rắn ---> thua
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('bạn thua mất rồi, nhấn ok để chơi lại');
            document.location.reload();
        }
    }
    // requestAnimationFrame(update);
}

function changeDirection(e) {
    // di chuyển rắn
    if (e.code == 'ArrowUp' && velocityY != 1) { //set không cho đi ngược lại
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    // đặt thức ăn ngẫu nhiên
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function count() {
    // in ra điểm số
    document.getElementById('score').innerHTML = "Score: " + score;
}