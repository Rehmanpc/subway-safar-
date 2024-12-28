const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5
};

let coins = [
    { x: 100, y: 150 },
    { x: 200, y: 250 },
    { x: 300, y: 350 }
];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    });
}

function movePlayer() {
    const keys = {};
    keys[38] = false;
    keys[40] = false;
    keys[37] = false;
    keys[39] = false;

    if (keys[38]) player.y -= player.speed;
    if (keys[40]) player.y += player.speed;
    if (keys[37]) player.x -= player.speed;
    if (keys[39]) player.x += player.speed;
}

function checkCollisions() {
    coins.forEach((coin, index) => {
        if (player.x < coin.x + 10 && player.x + player.width > coin.x && player.y < coin.y + 10 && player.y + player.height > coin.y) {
            coins.splice(index, 1);
            console.log('Coin collected!');
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCoins();
    movePlayer();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.keyCode] = false;
});

gameLoop();
