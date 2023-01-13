document.addEventListener("keyup", (e) => {
  platform.stopMoving();
});

document.addEventListener("keydown", (e) => {
  e = e || window.event;
  platform.handleKey(e.key);
});

function drawBricks() {
  bricks.forEach((brick) => brick.update())
}

function update() {
  if (
    ball.x >= platform.x &&
    ball.x <= platform.x + platform.width &&
    ball.y >= platform.y &&
    ball.y <= platform.y + platform.height
  ) {
    ball.reflectY()
  }
  else if (ball.x >= canvas.width || ball.x <= 0) {
    ball.reflectX()
  }
  else if (ball.y <= 0) {
    ball.reflectY();
  }
  else if (ball.y >= canvas.height) {
    --lives;
    initBall()
  }

  platform.update();
  drawBricks();
  ball.update();

  for (let i = 0; i < bricks.length; ++i) {
    let brick = bricks[i];

    if (ball.collides(brick)) {
      console.log(`collides with ${brick} `);
      if (brick.strength == 1) {
        bricks.splice(i, 1);
      }
      else if (ball.x >= brick.x && ball.x <= brick.x + brick.width) {
        ball.reflectY()
      }
      else if (ball.y >= brick.y && ball.y <= brick.y + brick.height) {
        ball.reflectX()
      }
      brick.destroy()
      score += 5;
      break;
    }
  }

  strokeWeight(5)
  fill('white')
  rect(width - 40 - textWidth(`Score ${score}`), 28, textWidth(`Score ${score}`) + 20, 30)

  fill('white')
  rect(20, 28, textWidth(`Lives ${lives}`) + 20, 30)

  strokeWeight(1)
  fill('green')

  textAlign(RIGHT);
  text(`Score ${score}`, width - 30, 50);

  textAlign(LEFT);
  text(`Lives ${lives}`, 30, 50);

  if (ball.y > platform.y - platform.width - 20) {
    platform.updateX(ball.x - platform.width / 2)
    platform.draw()
  }
  platform.update()
}

function initBall() {
  ball.y = 100;
}

function init() {
  BRICK_WIDTH = width / 32;
  BRICK_HEIGHT = height / 46;
  bricks = [];

  const top_margin = 100;
  const left_margin = (canvas.width - BRICK_WIDTH * 20) / 2;

  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 20; ++j) {
      bricks.push(
        new Brick(
          left_margin + j * BRICK_WIDTH,
          top_margin + i * BRICK_HEIGHT,
          dullRandomColor(),
          BRICK_WIDTH,
          BRICK_HEIGHT,
          randomIntFromRange(1, 2)
        )
      );
    }
  }
}

function setup() {
  createCanvas(1000, 800);
  textStyle(BOLD, 25);
  textSize(20);
  init();
}

function draw() {
  background("white");
  fill("white");
  rect(1, 1, width - 2, height - 2);
  update();
}
