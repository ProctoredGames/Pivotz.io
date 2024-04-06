const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables
let pivotX = canvas.width / 2; // Initial pivot X position
let pivotY = canvas.height / 2; // Initial pivot Y position
const pivotRadius = 10; // Radius of the pivot
const ballRadius = 20; // Radius of the ball
let ballX = canvas.width / 2; // Initial ball X position
let ballY = 100; // Initial ball Y position
const minDistance = 80; // Minimum distance between ball and pivot
const maxDistance = 120; // Maximum distance between ball and pivot
const distanceChangeRate = 0.02; // Rate at which distance changes over time
const gravity = 0.1; // Gravity affecting the ball

// Function to calculate distance between two points
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Function to draw the scene
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw line connecting pivot and ball
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(ballX, ballY);
    ctx.stroke();

    // Draw pivot
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, pivotRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

// Function to update the position of the ball
function update() {
    // Apply gravity to the ball
    ballY += gravity;

    // Calculate current distance between pivot and ball
    const currentDistance = distance(pivotX, pivotY, ballX, ballY);

    // Adjust distance if it's not within the specified range
    if (currentDistance < minDistance) {
        // Increase distance
        const deltaX = ballX - pivotX;
        const deltaY = ballY - pivotY;
        const factor = minDistance / currentDistance;
        ballX = pivotX + deltaX * factor;
        ballY = pivotY + deltaY * factor;
    } else if (currentDistance > maxDistance) {
        // Decrease distance
        const deltaX = ballX - pivotX;
        const deltaY = ballY - pivotY;
        const factor = maxDistance / currentDistance;
        ballX = pivotX + deltaX * factor;
        ballY = pivotY + deltaY * factor;
    }

    // Redraw
    draw();

    // Repeat
    requestAnimationFrame(update);
}

// Function to handle mouse click events
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    pivotX = event.clientX - rect.left;
    pivotY = event.clientY - rect.top;
}

// Event listener for mouse click
canvas.addEventListener('click', handleClick);

// Start simulation
update();