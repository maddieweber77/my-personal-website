// JavaScript (script.js)

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
    const container = document.getElementById("game-container");
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left - paddleWidth / 2;
    if (mouseX >= 0 && mouseX <= containerRect.width - paddleWidth) {
        paddle.style.left = mouseX + "px";
    }
});

// Game loop
function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collisions with walls
        if (ballX + ballSpeedX > 390 || ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX;
        }

        if (ballY + ballSpeedY < 0) {
        ballSpeedY = -ballSpeedY;
        }

    // Check if the ball hits the bottom
        if (ballY + ballSpeedY > 300) {
    // Reset the ball to the center
    ballX = 200;
    ballY = 200;
    ballSpeedX = 5;
    ballSpeedY = 5;
        }

    // Ball collision with paddle
        if (
            ballY + ballSpeedY > 280 &&
            ballY + ballSpeedY < 290 &&
            ballX + ballSpeedX > parseInt(paddle.style.left) &&
            ballX + ballSpeedX < parseInt(paddle.style.left) + paddleWidth
        ) {
            ballSpeedY = -ballSpeedY;
        }

    // Ball collision with bricks
    bricks.forEach((brick) => {
        if (ballY + ballSpeedY < brick.getBoundingClientRect().bottom &&
            ballY + ballSpeedY > brick.getBoundingClientRect().top &&
            ballX + ballSpeedX > brick.getBoundingClientRect().left &&
            ballX + ballSpeedX < brick.getBoundingClientRect().right) {
            brick.style.display = "none";
            ballSpeedY = -ballSpeedY;
        }
    });

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    requestAnimationFrame(update);
}

update();
