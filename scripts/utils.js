const colors = ["red", "blue", "green", "pink", "brown", "yellow"];

const PLATFORM_WIDTH = 80;
const PLATFORM_HEIGHT = 12;
const BALL_RADIUS = 12;

let BRICK_WIDTH;
let BRICK_HEIGHT;

let platform = new Platform(100, 700, 5, 0);
let ball = new Ball(400, 400, "green", 10, 10);

let bricks = [];
let score = 0;
let lives = 3;


function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function dullRandomColor() {
  return color(randomIntFromRange(0, 255), randomIntFromRange(50, 200), randomIntFromRange(0, 255))
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}
