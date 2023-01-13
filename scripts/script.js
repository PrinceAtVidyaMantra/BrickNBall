const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['red', 'blue', 'green', 'pink', 'brown', 'yellow',]

const PLATFORM_WIDTH = 80;
const PLATFORM_HEIGHT = 12;
const BALL_RADIUS = 8;
const BRICK_WIDTH = canvas.width / 32;
const BRICK_HEIGHT = canvas.height / 46;

let platform = new Platform(100, 800, 10, 0);
let ball = new Ball(400, 400, 'green', 2, 2);
// let ball = new Ball(130, 450, 'green', 0, 1);
let bricks = []
let score = 0
let lives = 3

// Event Listeners
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth - 20;
    canvas.height = innerHeight - 20;
    init()
})

document.addEventListener('keydown', (e) => {
    console.log('recdas');
    e = e || window.event;

    if (e.key == 'ArrowUp') {
        // up arrow
    }
    else if (e.key == 'ArrowDown') {
        // down arrow
    }
    else if (e.key == 'ArrowLeft') {
        console.log(`key is ${e.key}`)
        platform.moveHorizontal(-platform.velocityX)
    }
    else if (e.key == 'ArrowRight') {
        platform.moveHorizontal(platform.velocityX)
    }
    else {
        console.log(`key is ${e.key}`)
    }
});

function drawBricks() {
    bricks.forEach(brick => {
        brick.update();
    });
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.x >= platform.x && ball.x <= platform.x + platform.width &&
        ball.y >= platform.y && ball.y <= platform.y + platform.height) {
        ball.velocityX *= 1;
        ball.velocityY *= -1;
        ball.velocityX *= 0.1 * platform.velocityX;
        ball.velocityY *= 0.1 * platform.velocityX;

        console.log(`all velocity updated to ${ball.velocityX}`)
    }
    else if (ball.x >= canvas.width || ball.x <= 0) {
        ball.velocityX *= -1;
        // ball.velocityX *= 0.9;
    }
    else if (ball.y <= 0) {
        ball.velocityY *= -1;
        // ball.velocityY *= 0.9;
    }
    else if (ball.y >= canvas.height) {
        --lives;
        ball.y = 100
    }

    platform.update()
    drawBricks();
    ball.update();
    
    for (let i = 0; i < bricks.length; ++i) {
        let brick = bricks[i];
        if (ball.collides(brick)) {
            console.log(`collides with ${brick} `)
            bricks.splice(i, 1);
            score += 5;
            break;
        }
    }

    ctx.font = "30px Arial";
    ctx.textAlign = 'right'
    ctx.fillText(`Score: ${score}`, canvas.width - 30, 50);
    
    ctx.textAlign = 'left'
    ctx.fillText(`Lives: ${lives}`, 30, 50);
}

function displayScene() {
    requestAnimationFrame(displayScene)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
}

function run() {
    displayScene();
}

function init() {
    bricks = []

    const top_margin = 100;
    const left_margin = (canvas.width - BRICK_WIDTH * 20) / 2;

    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 20; ++j) {
            bricks.push(new Brick(left_margin + j * BRICK_WIDTH, top_margin + i * BRICK_HEIGHT, randomColor(colors), BRICK_WIDTH, BRICK_HEIGHT));
        }
    }
    run();
}

init();