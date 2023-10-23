// Variables
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const bricks = document.querySelectorAll(".brick");

let ballX = 200;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;
const paddleWidth = 80;

// Paddle movement
document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX - paddleWidth / 2;
    if (mouseX >= 0 && mouseX <= 320) {
        paddle.style.left = mouseX + "px";
    }
});

// Game loop
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collisions with walls
    if (ballX > 390 || ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddle
    if (
        ballY > 280 &&
        ballY < 290 &&
        ballX > parseInt(paddle.style.left) &&
        ballX < parseInt(paddle.style.left) + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with bricks
    bricks.forEach((brick) => {
        if (ballY < brick.getBoundingClientRect().bottom &&
            ballY > brick.getBoundingClientRect().top &&
            ballX > brick.getBoundingClientRect().left &&
            ballX < brick.getBoundingClientRect().right) {
            brick.style.display = "none";
            ballSpeedY = -ballSpeedY;
        }
    });

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    requestAnimationFrame(update);
}

update();