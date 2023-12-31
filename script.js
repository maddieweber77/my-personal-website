// JavaScript (script.js)

// Variables
const container = document.getElementById("game-container");
const paddle = document.getElementById("paddle");
const ball = document.getElementById("ball");
const bricks = document.querySelectorAll(".brick");

let ballX = 200;
let ballY = 200;
let ballSpeedX = 0; // Initially, no movement
let ballSpeedY = 0; // Initially, no movement
const paddleWidth = 80;

// Function to start the ball movement when you move your mouse
function startBallMovement() {
    if (ballSpeedX === 0 && ballSpeedY === 0) {
        // Set the ball's speed to a random angle
        const randomAngle = Math.random() * Math.PI / 3 + Math.PI / 6; // Adjust this angle as needed
        ballSpeedX = 4 * Math.cos(randomAngle);
        ballSpeedY = -4 * Math.sin(randomAngle);
    }
}

// Paddle movement
document.addEventListener("mousemove", (event) => {
    startBallMovement(); // Call this function when moving the mouse
    const mouseX = event.clientX - container.getBoundingClientRect().left - paddleWidth / 2;
    if (mouseX >= 0 && mouseX <= container.offsetWidth - paddleWidth) {
        paddle.style.left = mouseX + "px";
    }
});


// Game loop
function update() {
    ballX += ballSpeedX; // ballSpeedX is added to ballX to change the position (and same with Y)
    ballY += ballSpeedY;

    // Ball collisions with walls
        if (ballX + ballSpeedX > 390 || ballX + ballSpeedX < 0) {
        ballSpeedX = -ballSpeedX; 
        } // this subtracts ballSpeedX so that it doesn't go past the balls

        if (ballY + ballSpeedY < 0) {
        ballSpeedY = -ballSpeedY;
        }

    // Check if the ball hits the bottom
        if (ballY + ballSpeedY > 300) {
    // Reset the ball to the center
        ballX = 200;
        ballY = 200;
        ballSpeedX = 0; // no movement after hitting bottom
        ballSpeedY = 0; // no movement after hitting bottom
        startBallMovement()
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
    const brickRect = brick.getBoundingClientRect();
    console.log("Ball:", ballX, ballY);
    console.log("Brick:", brickRect.left, brickRect.top, brickRect.right, brickRect.bottom);

    if (
        ballY + ballSpeedY > brickRect.top &&
        ballY + ballSpeedY < brickRect.bottom &&
        ballX + ballSpeedX > brickRect.left &&
        ballX + ballSpeedX < brickRect.right
    ) {
        // Ball hits a brick
        brick.style.display = "none";
        ballSpeedY = -ballSpeedY; // Reverse ball's vertical speed
    }
});

    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    requestAnimationFrame(update);
}

update();
