const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const characterImage = new Image();
characterImage.src = 'path/to/character-sprite.png'; // Character sprite sheet
const coinImage = new Image();
coinImage.src = 'path/to/coin-sprite.png'; // Coin sprite sheet
const trainImage = new Image();
trainImage.src = 'path/to/train-sprite.png'; // Train sprite sheet

let coinsCollected = 0;

const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    frameX: 0,
    frameY: 0,
    moving: false,
    outfit: 'default'
};

const coins = [
    { x: 200, y: 250, frameX: 0 },
    { x: 400, y: 350, frameX: 0 },
    { x: 600, y: 150, frameX: 0 }
];

const train = {
    x: 800,
    y: 450,
    width: 100,
    height: 50,
    speed: 3,
    frameX: 0
};

let keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
    player.moving = true;
});
document.addEventListener('keyup', (event) => {
    delete keys[event.keyCode];
    player.moving = false;
});

function drawCharacter() {
    const outfitOffset = player.outfit === 'redOutfit' ? 50 : player.outfit === 'blueOutfit' ? 100 : 0;
    ctx.drawImage(characterImage, outfitOffset, 0, player.width, player.height, player.x, player.y, player.width, player.height);
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.drawImage(coinImage, coin.frameX * 32, 0, 32, 32, coin.x, coin.y, 32, 32);
    });
}

function drawTrain() {
    ctx.drawImage(trainImage, train.frameX * train.width, 0, train.width, train.height, train.x, train.y, train.width, train.height);
}

function movePlayer() {
    if (keys[37]) player.x -= player.speed; // left arrow
    if (keys[39]) player.x += player.speed; // right arrow
    if (keys[38]) player.y -= player.speed; // up arrow
    if (keys[40]) player.y += player.speed; // down arrow

    if (player.moving) {
        player.frameX = (player.frameX + 1) % 4; // Cycle through frames
    }
}

function moveTrain() {
    train.x -= train.speed;
    if (train.x < -train.width) {
        train.x = canvas.width;
    }
    train.frameX = (train.frameX + 1) % 4; // Cycle through frames
}

function checkCollisions() {
    coins.forEach((coin, index) => {
        if (player.x < coin.x + 32 && player.x + player.width > coin.x && player.y < coin.y + 32 && player.y + player.height > coin.y) {
            coins.splice(index, 1);
            coinsCollected += 10;
            console.log('Coin collected! Total coins: ' + coinsCollected);
        }
    });
}

function buyItem(item) {
    if (coinsCollected >= 100) {
        player.outfit = item;
        coinsCollected -= 100;
        console.log('Bought ' + item + '! Remaining coins: ' + coinsCollected);
    } else {
        console.log('Not enough coins to buy ' + item);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawCoins();
    drawTrain();
    movePlayer();
    moveTrain();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

characterImage.onload = () => {
    gameLoop();
};

