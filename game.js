const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const coinSound = document.getElementById('coinSound');
const hurtSound = document.getElementById('hurtSound');
const loginContainer = document.getElementById('loginContainer');
const gameContainer = document.querySelector('.game-container');

const runningStatusElement = document.getElementById('runningStatus');
const scoreElement = document.getElementById('score');
const coinsCollectedElement = document.getElementById('coinsCollected');

const characterImage = new Image();
characterImage.src = 'path/to/character-sprite.png'; // Character sprite sheet
const coinImage = new Image();
coinImage.src = 'path/to/coin-sprite.png'; // Coin sprite sheet
const trainImage = new Image();
trainImage.src = 'path/to/train-sprite.png'; // Train sprite sheet
const snowflakeImage = new Image();
snowflakeImage.src = 'path/to/snowflake.png'; // Snowflake sprite for winter weather
const policeImage = new Image();
policeImage.src = 'path/to/police-sprite.png'; // Police sprite sheet

let coinsCollected = 0;
let score = 0;
let soundEnabled = true;

const player = {
    x: 50,
    y: 300,
    width: 50,
    height: 50,
    speed: 5,
    originalSpeed: 5,
    frameX: 0,
    frameY: 0,
    moving: false,
    outfit: 'default',
    hurt: false
};

const police = {
    x: player.x - 60,
    y: player.y,
    width: 50,
    height: 50,
    frameX: 0,
    frameY: 0,
    visible: false
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

const snowflakes = [];

for (let i = 0; i < 100; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 1,
        size: Math.random() * 5 + 1
    });
}

let keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
    player.moving = true;
    updateRunningStatus(true);
});
document.addEventListener('keyup', (event) => {
    delete keys[event.keyCode];
    player.moving = false;
    updateRunningStatus(false);
});

function drawCharacter() {
    const outfitOffset = player.outfit === 'redOutfit' ? 50 : player.outfit === 'blueOutfit' ? 100 : 0;
    ctx.drawImage(characterImage, outfitOffset, 0, player.width, player.height, player.x, player.y, player.width, player.height);
}

function drawPolice() {
    if (police.visible) {
        ctx.drawImage(policeImage, police.frameX * police.width, police.frameY * police.height, police.width, police.height, police.x, police.y, police.width, police.height);
        // Police follows player
        police.x = player.x - 60;
        police.y = player.y;
    }
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.drawImage(coinImage, coin.frameX * 32, 0, 32, 32, coin.x, coin.y, 32, 32);
    });
}

function drawTrain() {
    ctx.drawImage(trainImage, train.frameX * train.width, 0, train.width, train.height, train.x, train.y, train.width, train.height);
}

function drawSnowflakes() {
    snowflakes.forEach(snowflake => {
        ctx.drawImage(snowflakeImage, snowflake.x, snowflake.y, snowflake.size, snowflake.size);
        snowflake.y += snowflake.speed;
        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    });
}

function movePlayer() {
    if (keys[37]) player.x -= player.speed; // left arrow
    if (keys[39]) player.x += player.speed; // right arrow
    if (keys[38]) player.y -= player.speed[_{{{CITATION{{{_1{](https://github.com/edsyang/blog/tree/2ce48a2788db8d4f4b5f5f5dc8c388799ea5c0c2/docs%2Fcourse%2Fvue%2F13-Vue.js-D.part%20four.md)
