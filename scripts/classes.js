
class obj {
    constructor(x, y, color, velocityX, velocityY) {
        this.x = x
        this.y = y
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.color = color
    }

    draw() {
    }

    update() {
        this.draw()
    }
}

class Brick extends obj {
    constructor(x, y, color, width = BRICK_WIDTH, height = BRICK_HEIGHT, strength = 1, velocityX = 0, velocityY = 0) {
        super(x, y, color, velocityX, velocityY)
        this.width = width
        this.height = height
        this.strength = strength
    }

    draw() {
        fill(this.color)
        rect(this.x + 2, this.y + 2, this.width - 4, this.height - 4)
    }
    destroy() {
        this.strength -= 1
        this.width -= 6
        this.x += 3
        this.height -= 4
        this.y += 2
    }
    collides() {

    }
}

class Ball extends obj {
    constructor(x, y, color, velocityX, velocityY, radius = BALL_RADIUS) {
        super(x, y, color, velocityX, velocityY)
        this.radius = radius
    }

    draw() {
        fill(this.color)
        circle(this.x, this.y, this.radius)
    }
    update() {
        this.x += this.velocityX
        this.y += this.velocityY
        this.draw()
    }

    collides(brick) {
        let Xn = Math.max(brick.x, Math.min(this.x, brick.x + brick.width))
        let Yn = Math.max(brick.y, Math.min(this.y, brick.y + brick.height))
        let Dx = Xn - this.x
        let Dy = Yn - this.y
        return (Dx ** 2 + Dy ** 2) <= this.radius ** 2
    }

    reflectY() {
        ball.velocityY *= -1

    }

    reflectX() {
        ball.velocityX *= -1
    }
}


/////////////////////
const FPS = 60;
class Platform extends obj {
    constructor(x, y, velocityX, velocityY, primary_color = 'blue', secondary_color = 'red', width = PLATFORM_WIDTH,
        height = PLATFORM_HEIGHT) {

        const radius = height / 2.0;
        super(x, y, primary_color, velocityX, velocityY)
        this.width = width
        this.height = height

        let base = new Brick(x + radius, y, primary_color, width - radius * 2, height, velocityX, velocityY);
        let right_end = new Ball(x + radius, y + radius - 0.2, secondary_color, velocityX, velocityY, radius + 2)
        let left_end = new Ball(x + radius + base.width, y + radius - 0.2, secondary_color, velocityX, velocityY, radius + 2)

        this.base = base
        this.right_end = right_end
        this.left_end = left_end
        this.moving = false
        this.direction = ""
    }

    handleKey(key) {

        if (key == "ArrowUp") {
            // up arrow
        } else if (key == "ArrowDown") {
            // down arrow
        } else if (key == "ArrowLeft") {
            this.direction = -1;
        } else if (key == "ArrowRight") {
            this.direction = 1;
        } else {
            console.log(`key is ${key}`);
        }
        this.startMoving()
    }

    draw() {
        this.right_end.draw()
        this.left_end.draw()
        this.base.draw()
    }

    update() {
        this.draw()
    }

    stopMoving() {
        clearTimeout(platform.moving);
        platform.moving = false;
    }

    startMoving() {
        if (!platform.moving) {
            this.moveLoop(this);
        }
    }

    moveLoop(platform) {
        platform.moveHorizontal()
        platform.moving = setTimeout(() => platform.moveLoop(platform), 1000 / FPS);
    }

    updateX(newX) {
        let oldx = this.x;
        let pixels = newX - oldx;
        this.base.x += pixels
        this.right_end.x += pixels
        this.left_end.x += pixels
        this.x += pixels
    }

    moveHorizontal() {
        const pixels = this.direction * this.velocityX;
        this.base.x += pixels
        this.right_end.x += pixels
        this.left_end.x += pixels
        this.x += pixels
    }

    collides(ball) {
        return ball.collides(this.base) || ball.collides(this.right_end) || ball.collides(this.left_end)
    }
}