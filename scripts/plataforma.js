const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speedX: 5,
  speedY: -5,
};

let platforms = [
  { x: 100, y: 500, width: 100, height: 20 },
  { x: 300, y: 400, width: 100, height: 20 },
  { x: 500, y: 300, width: 100, height: 20 },
];

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPlatforms() {
  platforms.forEach(platform => {
    ctx.beginPath();
    ctx.rect(platform.x, platform.y, platform.width, platform.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  });
}

function update() {
  // Move the ball
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Check collision with platforms
  platforms.forEach(platform => {
    if (ball.y + ball.speedY > platform.y &&
        ball.y + ball.speedY < platform.y + platform.height &&
        ball.x > platform.x &&
        ball.x < platform.x + platform.width) {
      ball.speedY = -ball.speedY; // Reverse the vertical speed
      removePlatformsBelow(platform);
      generateNewPlatforms();
    }
  });

  // Apply gravity
  ball.speedY += 0.1;

  // Check collision with walls
  if (ball.x + ball.speedX > canvas.width - ball.radius || ball.x + ball.speedX < ball.radius) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y + ball.speedY > canvas.height - ball.radius || ball.y + ball.speedY < ball.radius) {
    ball.speedY = -ball.speedY;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPlatforms();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function removePlatformsBelow(platform) {
  platforms = platforms.filter(p => p.y < platform.y);
}

function generateNewPlatforms() {
  const lastPlatform = platforms[platforms.length - 1];
  const newPlatformY = lastPlatform.y - 100; // Distance between platforms
  const newPlatform = {
    x: Math.random() * (canvas.width - 100),
    y: newPlatformY,
    width: 100,
    height: 20,
  };
  platforms.push(newPlatform);
}

gameLoop();