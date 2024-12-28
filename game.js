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

