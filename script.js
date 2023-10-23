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
